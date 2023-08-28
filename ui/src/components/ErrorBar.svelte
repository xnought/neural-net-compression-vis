<script>
	import * as Plot from "@observablehq/plot";

	let div;
	export let data = [{ error: 0, label: "Operator Norm" }];
	export let width = undefined;
	export let height = undefined;
	export let style = "background: none;";
	export let domain = [0, 1];

	$: settings = {
		width,
		height,
		style,
	};

	$: {
		if (data) {
			div?.firstChild?.remove(); // remove old chart, if any
			let d = data;
			div?.append(
				Plot.plot({
					marginLeft: 80,
					marginRight: 50,
					x: { domain },
					y: { label: null },
					// y: {},
					marks: [
						Plot.barX(d, {
							y: "label",
							x: "error",
							fill: "darkgrey",
							fillOpacity: 0.5,
						}),
						Plot.text(d, {
							x: "error",
							y: "label",
							text: (d) => d.error.toFixed(3),
							textAnchor: "start",
							dx: 5,
							fontSize: 14,
							fontStyle: "italic",
						}),
					],
					...settings,
				})
			);
		}
	}
</script>

<div on:mousemove bind:this={div} role="img" />
