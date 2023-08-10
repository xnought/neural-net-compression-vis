<script>
	const images = [1, 2, 4, 8, 16, 32, 64, 128].map((x) => `${x}.png`);
	let selected = 3;
</script>

<input type="range" min="0" max={images.length - 1} bind:value={selected} />
<div id="kmeans-container">
	<div id="k">
		Compressed
		<img src={images[selected]} style="width: 200px" />
	</div>
	{2 ** selected} colors
	<div id="og">
		Original
		<img src="dog.png" style="width: 200px" />
	</div>
	279,744 colors
</div>

<style>
	/*  put stuff here */
	#kmeans-container {
		display: flex;
		flex-direction: row;
		gap: 10px;
	}
	#og {
	}
	#k {
	}
</style>
