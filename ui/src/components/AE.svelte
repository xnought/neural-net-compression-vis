<script>
	import { onMount } from "svelte";
	import { Sequential, Linear, ReLU, Sigmoid } from "./nn";
	import { Tensor } from "./tensor";
	import * as d3 from "d3";
	import AeSkeleton from "./AESkeleton.svelte";

	async function fetchStateDict(name) {
		const model = await fetch(name);
		return model.json();
	}

	function Autoencoder() {
		return new Sequential(
			new Linear(imageWidth * imageWidth, 1000),
			new ReLU(),
			new Linear(1000, 256),
			new ReLU(),
			new Linear(256, 256),
			new ReLU(),
			new Linear(256, 1000),
			new ReLU(),
			new Linear(1000, imageWidth * imageWidth),
			new Sigmoid()
		);
	}

	async function loadAllModels(Model) {
		const reqs = options.map((opt) =>
			fetchStateDict(`ae-${opt}-quantized.json`)
		);
		const stateDicts = await Promise.all(reqs);
		return stateDicts.map((d) => Model().loadStateDict(d));
	}

	let models;
	let model;
	onMount(async () => {
		models = await loadAllModels(Autoencoder);
		console.log(models);
		model = models.at(-1);

		inputCtx = inputCanvas.getContext("2d", { willReadFrequently: true });
		inputCtx.fillStyle = "black";
		inputCtx.fillRect(0, 0, width, height);

		outputCtx = outputCanvas.getContext("2d");
		outputCtx.fillStyle = "black";
		outputCtx.fillRect(0, 0, width, height);
	});

	function draw(ctx, x, y) {
		ctx.fillStyle = "white";
		ctx.fillRect(x, y, brushSize, brushSize);
	}
	function exportToGreyscale(ctx, width, height, brushSize) {
		const colors = Tensor.$(
			imageWidth * imageWidth,
			[1, imageWidth * imageWidth],
			"f32"
		);
		for (let i = 0; i < imageWidth; i++) {
			for (let j = 0; j < imageWidth; j++) {
				const pixel =
					ctx.getImageData(
						i * brushSize,
						j * brushSize,
						brushSize,
						brushSize
					).data[0] / 255.0;
				colors.data[j * imageWidth + i] = pixel;
			}
		}
		return colors;
	}

	/**
	 * Takes the output tensor and writes in greyscale to the canvas context
	 * @param {HTMLCanvasContext2D} ctx
	 * @param {Tensor} output
	 */
	function writeToCanvasWithGreyscale(ctx, output) {
		// output will be in the format from 0 to 1.0 and shaped [1, imageWidth*imageWidth]
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, width, height);
		for (let i = 0; i < imageWidth; i++) {
			for (let j = 0; j < imageWidth; j++) {
				const pixel = output.data[j * imageWidth + i];
				const c = d3.color("hsl(0, 0%, " + pixel * 100 + "%)");
				ctx.fillStyle = c.toString();
				ctx.fillRect(
					i * brushSize,
					j * brushSize,
					brushSize,
					brushSize
				);
			}
		}
	}

	function updateOutput() {
		const input = exportToGreyscale(inputCtx, width, height, brushSize);
		const output = model.forward(input);
		writeToCanvasWithGreyscale(outputCtx, output);
	}

	/** @type {HTMLCanvasElement}*/
	let inputCanvas;
	let inputCtx;

	/** @type {HTMLCanvasElement}*/
	let outputCanvas;
	let outputCtx;

	let imageWidth = 28;
	let width = imageWidth * 6,
		height = width;
	let brushSize = width / imageWidth;
	let down = false;

	const options = [1];
	let optionSelected = 0;
	$: selected = options[optionSelected];
	console.log(selected);
</script>

<input
	type="range"
	min="0"
	max={options.length - 1}
	bind:value={optionSelected}
/>
{selected}

<div class="container">
	<div>
		<div class="label">Input | You drag to draw!</div>
		<div>
			<canvas
				class="input-canvas"
				bind:this={inputCanvas}
				{width}
				{height}
				on:mousedown={() => {
					down = true;
				}}
				on:mouseup={() => {
					down = false;
					updateOutput();
				}}
				on:mousemove={(e) => {
					if (down) {
						let x = e.offsetX;
						let y = e.offsetY;
						// make sure x and y snap to a multiple of brushSize
						x -= x % brushSize;
						y -= y % brushSize;
						draw(inputCtx, x, y);
					}
				}}
			/>
		</div>
		<button
			on:click={() => {
				inputCtx.fillStyle = "black";
				inputCtx.fillRect(0, 0, width, height);
				outputCtx.fillStyle = "black";
				outputCtx.fillRect(0, 0, width, height);
			}}>Clear Canvas</button
		>
	</div>
	<div>
		<div class="label">Autoencoder</div>
		<AeSkeleton color="steelblue" />
	</div>
	<div>
		<div class="label">Output</div>
		<div>
			<canvas
				bind:this={outputCanvas}
				{width}
				{height}
				class="output-canvas"
			/>
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		gap: 5px;
	}
	.label {
		font-size: 13px;
		margin-bottom: 5px;
		opacity: 0.7;
	}
	.input-canvas {
		border: 3px solid steelblue;
		border-radius: 3px;
	}
	.output-canvas {
		border: 3px solid salmon;
		border-radius: 3px;
	}
</style>
