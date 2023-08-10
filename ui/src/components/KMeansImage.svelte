<script>
	const images = [1, 2, 4, 8, 16, 32, 64, 128].map((x) => `${x}.png`);
	export let selected = 2;
</script>

<input type="range" min="0" max={images.length - 1} bind:value={selected} />
<div id="kmeans-container">
	<div id="k">
		Compressed
		<div>
			<img src={images[selected]} style="width: 200px" />
		</div>
		<div>
			{2 ** selected} colors
		</div>
		<!-- <div>
			(encoded with {Math.log2(2 ** selected)} bits)
		</div> -->
	</div>
	<div id="og">
		Original
		<div>
			<img src="dog.png" style="width: 200px" />
		</div>
		<div>279,744 colors</div>
	</div>
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
	img {
		transition: all 1s linear;
	}
</style>
