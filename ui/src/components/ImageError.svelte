<script>
	import { onMount } from "svelte";

	const original = "dog.png";
	const images = [1, 2, 4, 8, 16, 32, 64, 128, 256].map((x) => `${x}.png`);
	export let selected = 0;
	let image = images[selected];
	export let width = 230;
	export let showSlider = true;
	export let height = 150;
	// actual 880 602

	let canvasEl = {
		original: undefined,
		image: undefined,
		diff: undefined,
	};
	let ctx = {
		original: undefined,
		image: undefined,
		diff: undefined,
	};

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

	function computeDiff(ctx, imageData, ogData) {
		const diff = new Uint8ClampedArray(width * height * 4);
		for (let g = 0; g < width * height * 4; g += 4) {
			const R = Math.abs(imageData[g] - ogData[g]);
			const G = Math.abs(imageData[g + 1] - ogData[g + 1]);
			const B = Math.abs(imageData[g + 2] - ogData[g + 2]);
			// const maxDifference = ogData[g] + ogData[g + 1] + ogData[g + 2];
			const maxDifference = 255 * 3;
			const totalDifference = R + G + B;
			const normalized = totalDifference / maxDifference;
			diff[g] = 255;
			diff[g + 3] = Math.round(normalized * 255);
		}
		const img = new ImageData(width, height, { colorSpace: "srgb" });
		img.data.set(diff);
		ctx.diff.putImageData(img, 0, 0);
	}

	let imageData, ogData;
	onMount(async () => {
		ctx.original = canvasEl.original.getContext("2d");
		ctx.image = canvasEl.image.getContext("2d", {
			willReadFrequently: true,
		});
		ctx.diff = canvasEl.diff.getContext("2d");

		await Promise.allSettled([
			drawImage(ctx.image, image),
			drawImage(ctx.original, original),
		]).then(() => {
			imageData = ctx.image.getImageData(0, 0, width, height);
			ogData = ctx.original.getImageData(0, 0, width, height);
			computeDiff(ctx, imageData.data, ogData.data);
		});
	});

	async function update(image) {
		if (ctx.diff && ogData) {
			await drawImage(ctx.image, image).then(() => {
				imageData = ctx.image.getImageData(0, 0, width, height);
				computeDiff(ctx, imageData.data, ogData.data);
			});
		}
	}

	$: {
		image = images[selected];
		update(image);
	}
</script>

{#if showSlider}
	<input type="range" min="0" max={images.length - 1} bind:value={selected} />
	<span class="label">{2 ** selected} colors</span>
{/if}
<div id="kmeans-container">
	<div id="k">
		<div class="label">Compressed: Averages</div>
		<div>
			<canvas {width} {height} bind:this={canvasEl.image} />
		</div>
	</div>
	<div id="og">
		<div class="label">Original</div>
		<div>
			<canvas {width} {height} bind:this={canvasEl.original} />
		</div>
	</div>
	<div>
		<div class="label">Error</div>
		<canvas {width} {height} bind:this={canvasEl.diff} />
	</div>
</div>

<style>
	.label {
		font-size: 13px;
		margin-bottom: 5px;
		opacity: 0.7;
	}
	/*  put stuff here */
	#kmeans-container {
		display: flex;
		flex-direction: row;
		gap: 20px;
	}
	#og {
	}
	#k {
	}
	canvas {
		border-radius: 5px;
		box-shadow: 0px 0px 2px 2px #00000020;
		image-rendering: pixelated;
		image-rendering: optimizeSpeed; /* Older versions of FF          */
		image-rendering: -moz-crisp-edges; /* FF 6.0+                       */
		image-rendering: -webkit-optimize-contrast; /* Safari                        */
		image-rendering: -o-crisp-edges; /* OS X & Windows Opera (12.02+) */
		-ms-interpolation-mode: nearest-neighbor; /* IE                            */
	}
</style>
