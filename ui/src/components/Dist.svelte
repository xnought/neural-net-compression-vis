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

	function toJson(data, shape, label = "Original Weights") {
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
				d = d.concat(toJson(data2, shape, "Quantized Weights"));
				// d = toJson(data2, shape, "Quantized Weights");
			}
			div?.append(
				Plot.plot({
					facet: { label: null },
					y: { grid: true },
					color: {
						style: "background:none;",
						type: "linear",
						scheme: "RdBu",
					},
					marks: [
						Plot.rectY(
							d,
							Plot.binX(
								{ y: "count" },
								{ x: "weight", fx: "label", fill: "weight" }
							)
						),
						Plot.ruleY([0]),
					],
					...settings,
				})
			);
		}
	}
</script>

<div on:mousemove bind:this={div} role="img" />
