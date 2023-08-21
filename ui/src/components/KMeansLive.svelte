<script>
	import { Tensor } from "./tensor";
	import { quantize } from "./kmeans";
	import Heatmap from "./Heatmap.svelte";
	import Dist from "./Dist.svelte";

	const m = 30,
		n = 10;
	const dataOptions = {
		uniform: () => Tensor.randu([m, n]),
		zeros: () => Tensor.zeros([m, n]),
	};
	let selected = "uniform";
	let bits = 1;

	$: data = dataOptions[selected]();
	$: quant = quantize(data, bits);

	function reconstructFromCodebook(quant) {
		let reconstructed = Tensor.zeros([m, n]);
		for (let i = 0; i < m; i++) {
			for (let j = 0; j < n; j++) {
				let index = quant.data[i * n + j];
				reconstructed.data[i * n + j] = quant.codebook.data[index];
			}
		}
		return reconstructed;
	}
</script>

<select bind:value={selected}>
	{#each Object.keys(dataOptions) as opt}
		<option value={opt}>{opt}</option>
	{/each}
</select>

<input type="range" min="1" max="8" bind:value={bits} />
{bits} bits
<Heatmap
	data={data.data}
	data2={reconstructFromCodebook(quant).data}
	shape={[m, n]}
/>
<Dist
	data={data.data}
	data2={reconstructFromCodebook(quant).data}
	shape={[m, n]}
	height={200}
/>

<style>
	/*  put stuff here */
</style>
