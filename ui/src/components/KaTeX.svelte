<script>
	import katex from "katex";

	let html = "";
	export let big = false;
	export let text = "c = \\pm\\sqrt{a^2 + b^2}";
	$: {
		html = katex.renderToString(text, {
			throwOnError: false,
			displayMode: big,
		});
	}
</script>

{@html html}
