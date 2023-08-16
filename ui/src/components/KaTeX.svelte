<script>
	import katex from "katex";

	let html = "";
	export let big = false;
	export let text = "c = \\pm\\sqrt{a^2 + b^2}";
	export let begin = "";
	$: {
		let insertedText = text;
		if (begin.length > 0) {
			insertedText =
				`\\begin{${begin}}` + insertedText + `\\end{${begin}}`;
		}
		html = katex.renderToString(
			insertedText.replaceAll("[", "{").replaceAll("]", "}"),
			{
				throwOnError: false,
				displayMode: big || begin.length > 0,
			}
		);
	}
</script>

{@html html}
