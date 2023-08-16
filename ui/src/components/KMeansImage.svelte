<script>
	import { onMount } from "svelte";

	const images = [1, 2, 4, 8, 16, 32, 64, 128].map((x) => `${x}.png`);
	export let selected = 2;
	export let width = 300;
	export let showSlider = false;

	// onMount(() => {
	// 	const img = document.querySelector("#original");
	// 	console.log(img.naturalWidth, img.naturalHeight);
	// });
</script>

{#if showSlider}
	<input type="range" min="0" max={images.length - 1} bind:value={selected} />
	<span class="label">{2 ** selected} colors</span>
{/if}
<div id="kmeans-container">
	<div id="k">
		<div class="label">Compressed: Averages</div>
		<div>
			<img
				id="compressed"
				src={images[selected]}
				style="width: {width}px;"
			/>
		</div>
	</div>
	<div id="og">
		<div class="label">Original</div>
		<div>
			<img id="original" src="dog.png" style="width: {width}px;" />
		</div>
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
	img {
		border-radius: 5px;
		box-shadow: 0px 0px 2px 2px #00000020;
	}
</style>
