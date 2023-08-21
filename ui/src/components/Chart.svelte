<script>
	let div;
	export let spec;
	export let width = undefined;
	export let height = undefined;

	$: {
		div?.firstChild?.remove(); // remove old chart, if any
		div?.append(
			spec.plot({ grid: true, style: "background: none;", width, height })
		);
	}
</script>

<div on:mousemove bind:this={div} role="img" />
