<script>
	import { onMount } from "svelte";

	const whRatio = 602 / 880;
	export let width = 250;
	export let height = whRatio * width;
	let canvasEl;
	let canvasCtx;

	let windowSize = 8;
	let svgWidth = 125,
		svgHeight = 125;
	let mouseX = 200,
		mouseY = 85;
	let windowColor = "salmon";

	function drawImage(ctx, image) {
		const p = new Promise((resolve, reject) => {
			const img = new Image();
			img.src = image;
			img.onload = function () {
				ctx.drawImage(img, 0, 0, width, height);
				resolve();
			};
		});
		return p;
	}

	function noSmoothing(ctx) {
		ctx.imageSmoothingEnabled = false;
	}
	let mounted = false;
	onMount(async () => {
		canvasCtx = canvasEl.getContext("2d", {
			willReadFrequently: true,
		});
		noSmoothing(canvasCtx);
		await drawImage(canvasCtx, "8.png");
		computeCodebook(canvasCtx.getImageData(0, 0, width, height).data);
		mounted = true;
	});

	let codebook;
	function computeCodebook(d) {
		codebook = {};
		let inc = 0;
		let json = [];
		for (let i = 0; i < d.length; i += 4) {
			const R = d[i];
			const G = d[i + 1];
			const B = d[i + 2];
			const key = `rgb(${R},${G},${B})`;
			if (!(key in codebook)) {
				codebook[key] = inc;
				inc++;
			}
		}
		return json;
	}

	let data;
	function toJson(d) {
		let json = [];
		for (let i = 0; i < d.length; i += 4) {
			const R = d[i];
			const G = d[i + 1];
			const B = d[i + 2];
			const key = `rgb(${R},${G},${B})`;
			const index = codebook[key] ?? -1;
			if (index > 8) {
				// some browsers mess up
				notWorking = true;
			}
			json.push({ R, G, B, index });
		}
		return json;
	}
	function read(x, y, windowSize = 3) {
		// if (x > width - windowSize || y > height - windowSize) return;
		const d = canvasCtx.getImageData(x, y, windowSize, windowSize).data;
		data = toJson(d);
	}

	$: if (mounted && mouseX !== undefined && mouseY !== undefined)
		read(mouseX, mouseY, windowSize);
	let notWorking = false;
</script>

<div style="position: relative; display: flex; gap: 10px; align-items: center;">
	{#if notWorking}
		<div style="color: red;">
			<img
				src="not-working.gif"
				alt="each pixel indexes into shared colors"
			/>
			<div>
				For an interactive visualization, try a Chrome based browser
				instead. Fell back on GIF either because imageSmoothingEnabled
				not working or Canvas Pixelated CSS property not working.
			</div>
		</div>
	{:else}
		<canvas bind:this={canvasEl} {width} {height} />
		<svg
			{width}
			{height}
			style="position: absolute; left: 0; top: 0; cursor: none;"
			on:mousemove={(e) => {
				mouseX = e.offsetX;
				mouseY = e.offsetY;
			}}
		>
			<rect
				x={mouseX}
				y={mouseY}
				width={windowSize}
				height={windowSize}
				fill="none"
				stroke={windowColor}
				stroke-width={2}
			/>
		</svg>

		<div>
			<div style="color: {windowColor}; margin-bottom: 5px;">
				Magnified
			</div>
			<svg
				width={svgWidth}
				height={svgHeight}
				style="outline: {windowColor} solid 2px;"
			>
				{#if data}
					{#each { length: windowSize } as _, i}
						{#each { length: windowSize } as _, j}
							{@const square = svgWidth / windowSize}
							{@const d = data[j * windowSize + i]}
							{@const color = `rgb(${d.R}, ${d.G}, ${d.B})`}
							{@const textOffset = square / 2}
							{@const textSize = 4}
							{#if d.index !== -1}
								<rect
									x={i * square}
									y={j * square}
									width={square}
									height={square}
									fill={color}
									stroke="white"
									stroke-width={1}
									stroke-opacity={0.2}
								/>
								<text
									x={i * square + textOffset}
									y={j * square + textOffset + textSize}
									fill="white"
									style="font-size: 11px; font-family: var(--svp-code-font); font-weight: 400;"
									text-anchor="middle">{d.index}</text
								>
							{/if}
						{/each}
					{/each}
				{/if}
			</svg>
		</div>

		indexes into →

		<div>
			{#if codebook}
				<b>Shared Weights</b>
				<br />
				{#each Object.keys(codebook) as item, i}
					{#if i < 8}
						<div style="width: 160px; ">
							<span
								style="font-family: var(--svp-code-font); font-weight: 500;"
								>{codebook[item]}</span
							>
							<div
								style="background: {item}; color: white; display: inline;"
							>
								{item}
							</div>
						</div>
					{/if}
				{/each}
			{/if}
		</div>
	{/if}
</div>

<style>
	canvas {
		border-radius: 5px;
		box-shadow: 0px 0px 2px 2px #00000020;
		image-rendering: pixelated;
	}
</style>
