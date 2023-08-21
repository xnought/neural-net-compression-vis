<script>
	import { Tensor } from "./tensor";

	const unif = Tensor.randu([10, 10]);

	/**
	 * Takes the tensor assuming 1D (n, 1) and computes iterations of k means
	 * with no fancy optimizations or initializations
	 *
	 * @todo add optimizations and initializations
	 * @param t {Tensor}
	 * @returns {{centroids: Tensor, assignments: Tensor}}
	 */
	function kMeans1D(t, nClusters = 8, maxIter = 300, tol = 1e-4) {
		const n = t.shape[0];
		const centroids = Tensor.randu([nClusters, 1]);
		const assignments = Tensor.zeros([n, 1], "u8");

		function updateAssignments(t, centroids, assignments) {
			for (let i = 0; i < n; i++) {
				const d = t.data[i];
				// pick which centroid is the closest and set that as the assignment
				let closest = 0;
				let closestDist = Infinity;
				for (let j = 0; j < nClusters; j++) {
					const c = centroids.data[j];
					const dist = (c - d) ** 2;
					if (dist < closestDist) {
						closestDist = dist;
						closest = j;
					}
				}
				assignments.data[i] = closest;
			}
		}

		function updateCentroids(t, centroids, assignments) {
			for (let i = 0; i < nClusters; i++) {
				let sum = 0;
				let count = 0;
				for (let j = 0; j < n; j++) {
					if (assignments.data[j] === i) {
						sum += t.data[j];
						count++;
					}
				}
				if (count > 0) {
					centroids.data[i] = sum / count;
				}
			}
		}

		function hasConverged() {
			return false;
		}

		let i = 0;
		while (i < maxIter) {
			// 1. compute assignments
			updateAssignments(t, centroids, assignments);
			// 2. compute centroids
			updateCentroids(t, centroids, assignments);
			// 3. if the previous centroids are close enough to the current centroids, stop
			if (hasConverged()) break;
			i++;
		}

		return {
			centroids,
			assignments,
		};
	}

	const { centroids, assignments } = kMeans1D(unif);
	centroids.print();
	assignments.print();
</script>

<div>k means live</div>

<style>
	/*  put stuff here */
</style>
