<script>
	import { Tensor } from "./tensor";
	import { quantize } from "./kmeans";
	import Heatmap from "./Heatmap.svelte";
	import Dist from "./Dist.svelte";
	import ErrorBar from "./ErrorBar.svelte";
	import * as d3 from "d3";
	import { pinv } from "./pinv";
	import Katex from "./KaTeX.svelte";
	import SizeCompare from "./SizeCompare.svelte";

	const m = 20,
		n = 20;
	const dataOptions = {
		uniform: Tensor.randu([m, n], -2, 2),
		normal: Tensor.randn([m, n], 0, 1),
		outlier: extremeOutliers(Tensor.randn([m, n], 0, 1), 25, 1),
	};
	let selected = "normal";
	let bits = 1;
	const cache = {};
	$: data = dataOptions[selected];
	$: quant = quantizeOrFromCache(selected, data, bits);

	function quantizeOrFromCache(selected, data, bits) {
		const key = `${selected}-${bits}`;
		if (!(key in cache)) {
			cache[key] = quantize(data, bits);
		}
		return cache[key];
	}

	function extremeOutliers(t, value = 10, times = 1) {
		for (let i = 0; i < times; i++) {
			const m = d3.randomInt(t.shape[0] - 1)();
			const n = d3.randomInt(t.shape[1] - 1)();
			t.data[t.index2D(m, n)] = value;
		}
		return t;
	}

	/**
	 * Matrix operator 1-norm
	 * @param t {Tensor}
	 */
	function matrixOperator1Norm(t) {
		let maxSum = -Infinity;
		for (let j = 0; j < t.shape[1]; j++) {
			for (let i = 0; i < t.shape[0]; i++) {
				const sum = Math.abs(t.value2D(i, j));
				if (sum > maxSum) maxSum = sum;
			}
		}
		return maxSum;
	}
	function quantizationError(W, Q) {
		const diff =
			matrixOperator1Norm(W.sub(Q, true)) / matrixOperator1Norm(W);
		return diff;
	}

	/**
	 * Condition number of a tensor as ||A|| * ||A^-1||
	 * @param A {Tensor}
	 */
	function cond1(A) {
		return matrixOperator1Norm(A) * matrixOperator1Norm(pinv(A));
	}

	function theoreticalTensorSize(t) {
		const bitwidth = t.dtype === "f32" ? 32 : 8;
		return t.shape[0] * t.shape[1] * bitwidth;
	}
	function theoreticalTensorBits(t, bits = -1) {
		const size = theoreticalTensorSize(t);
		if (bits === -1) {
			return size;
		} else {
			const codebookSize = 2 ** bits;
			return size + codebookSize * 8;
		}
	}

	$: error = quantizationError(data, quant);
	$: condNum = cond1(data);
</script>

<select bind:value={selected}>
	{#each Object.keys(dataOptions) as opt}
		<option value={opt}>{opt}</option>
	{/each}
</select>

<input type="range" min="1" max="8" bind:value={bits} />
{bits} bits
{#if data}
	{@const quantizedData = quant.reconstruct()}
	<Heatmap
		data={data.data}
		data2={quantizedData.data}
		shape={[m, n]}
		height={200}
	/>
	<Dist
		data={data.data}
		data2={quantizedData.data}
		shape={[m, n]}
		height={200}
	/>
{/if}
<SizeCompare
	data={[
		{
			label: "W bytes",
			size: theoreticalTensorBits(data) / 8,
		},
		{
			label: "Q bytes",
			size: theoreticalTensorBits(quant, bits) / 8,
		},
	]}
/>
<ErrorBar data={[{ label: "||W-Q||/||W||", error }]} />

<div class="label">
	<Katex text="||W|| \ ||W^[-1]||" /> as condition number = {condNum.toFixed(
		3
	)}
</div>

<div class="label">
	<Katex text="\left(||W||| \ |W^[-1]||\right)\left(||W-Q||/||W||\right)" /> as
	combined error = {(error * condNum).toFixed(3)}
</div>

<style>
	.label {
		font-size: 13px;
		margin-bottom: 5px;
		opacity: 0.7;
	}
	/*  put stuff here */
</style>
