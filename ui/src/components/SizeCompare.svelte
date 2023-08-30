<script>
	import * as Plot from "@observablehq/plot";

	let div;
	export let data = [{ size: 2000, label: "Original" }];
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
					x: {},
					y: { label: null },
					marks: [
						Plot.barX(d, {
							y: "label",
							x: "size",
							fill: "darkgrey",
							fillOpacity: 0.5,
						}),
						// Plot.text(d, {
						// 	x: "size",
						// 	y: "label",
						// 	text: (d) => d.size.toFixed(3),
						// 	textAnchor: "start",
						// 	dx: 5,
						// 	fontSize: 14,
						// 	fontStyle: "italic",
						// }),
					],
					...settings,
				})
			);
		}
	}
</script>

<div on:mousemove bind:this={div} role="img" />
