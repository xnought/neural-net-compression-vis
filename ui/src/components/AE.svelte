<script>
	import { onMount } from "svelte";
	import { Sequential, Linear, ReLU, Sigmoid } from "./nn";
	import { Tensor } from "./tensor";

	async function fetchStateDict(name) {
		const model = await fetch("ae-1-quantized.json");
		return model.json();
	}

	function Autoencoder() {
		return new Sequential(
			new Linear(28 * 28, 1000),
			new ReLU(),
			new Linear(1000, 256),
			new ReLU(),
			new Linear(256, 256),
			new ReLU(),
			new Linear(256, 1000),
			new ReLU(),
			new Linear(1000, 28 * 28),
			new Sigmoid()
		);
	}

	onMount(async () => {
		// const stateDict = await fetchStateDict("ae-1-quantized.json");
		// const model = Autoencoder(
		// 	new Linear(28 * 28, 1000),
		// 	new ReLU(),
		// 	new Linear(1000, 256),
		// 	new ReLU(),
		// 	new Linear(256, 256),
		// 	new ReLU(),
		// 	new Linear(256, 1000),
		// 	new ReLU(),
		// 	new Linear(1000, 28 * 28),
		// 	new Sigmoid()
		// ).loadStateDict(stateDict);
		// const input = Tensor.zeros([1, 28 * 28], "f32");
		// const output = model.forward(input);
	});
	/* Put stuff here */
</script>

<div><!-- put stuff here --></div>

<style>
	/*  put stuff here */
</style>
