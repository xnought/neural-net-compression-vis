<script>
	import * as Plot from "@observablehq/plot";

	let div;
	/** @type {import("./tensor").Tensor}*/
	export let tensor;
	export let width = undefined;
	export let height = undefined;
	export let style = "background: none;";

	$: settings = {
		width,
		height,
		style,
	};

	$: {
		if (tensor) {
			div?.firstChild?.remove(); // remove old chart, if any
			const data = tensor.data;
			let max = -Infinity;
			for (let i = 0; i < data.length; i++) {
				if (data[i] > max) max = data[i];
			}
			console.log(max);

			const _width = tensor.shape[0];
			const _height = tensor.shape[1];
			div?.append(
				Plot.plot({
					color: {
						type: "diverging",
						scheme: "RdBu",
						legend: true,
						style: "background:none;",
						domain: [-0.5, 0.5],
					},
					marks: [
						Plot.raster(data, {
							width: _width,
							height: _height,
							interpolate: "random-walk",
						}),
					],
					...settings,
					facet: { label: null },
				})
			);
		}
	}
</script>

<div on:mousemove bind:this={div} role="img" />
