<script>
	import * as Plot from "@observablehq/plot";

	let div;
	export let data;
	export let data2 = null;
	export let shape = [10, 10];
	export let width = undefined;
	export let height = undefined;
	export let style = "background: none;";

	$: settings = {
		width,
		height,
		style,
	};

	function toJson(data, shape, label = "Weights (W)") {
		let total = [];
		for (let i = 0; i < shape[0]; i++) {
			for (let j = 0; j < shape[1]; j++) {
				let entry = { i, j, weight: data[i * shape[1] + j], label };
				total.push(entry);
			}
		}
		return total;
	}

	$: {
		if (data) {
			div?.firstChild?.remove(); // remove old chart, if any
			let d = toJson(data, shape);
			if (data2) {
				d = d.concat(toJson(data2, shape, "Quantized Weights (Q)"));
			}
			div?.append(
				Plot.plot({
					padding: 0,
					grid: true,
					x: { axis: null, label: "column", inset: 30 },
					y: { axis: null, label: "row" },
					color: {
						type: "diverging",
						scheme: "RdBu",
						legend: true,
						style: "background:none;",
					},
					marks: [
						Plot.cell(d, {
							x: "i",
							y: "j",
							fx: "label",
							fill: "weight",
							inset: 0.5,
							tip: true,
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
