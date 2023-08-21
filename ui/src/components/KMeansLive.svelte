<script>
	import { Tensor } from "./tensor";
	import { quantize } from "./kmeans";

	const unif = Tensor.randu([10, 10]);
	const out = quantize(unif, 2);
	out.print();
	out.codebook.print();
</script>

<div>k means live</div>

<style>
	/*  put stuff here */
</style>
