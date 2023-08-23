<script>
	import { Tensor } from "./tensor";
	import { quantize } from "./kmeans";
	import Heatmap from "./Heatmap.svelte";
	import Dist from "./Dist.svelte";
	import * as d3 from "d3";

	const m = 15,
		n = 15;
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
		// W.sub(Tensor.zeros(W.shape), true).print();
		// W.print();
		return matrixOperator1Norm(W.sub(Q, true)) / matrixOperator1Norm(W);
	}

	$: error = quantizationError(data, quant);
</script>

<select bind:value={selected}>
	{#each Object.keys(dataOptions) as opt}
		<option value={opt}>{opt}</option>
	{/each}
</select>

<input type="range" min="0" max="7" bind:value={bits} />
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
<p>Quantization error: {error.toFixed(5)}</p>

<style>
	/*  put stuff here */
</style>
