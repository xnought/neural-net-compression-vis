import { kmeans } from "ml-kmeans";
import { Tensor } from "./tensor";

/**
 * Takes the tensor assuming 1D (m, n) m*n and computes iterations of k means
 * with no fancy optimizations or initializations
 *
 * @todo add optimizations and initializations
 * @param t {Tensor}
 * @returns {{centroids: Tensor, assignments: Tensor}}
 */
function kMeans1D(t, nClusters = 8, maxIter = 300, tol = 1e-4) {
	const n = t.shape[0] * t.shape[1];
	const centroids = Tensor.randu([nClusters, 1]);
	const assignments = Tensor.zeros(t.shape, "u8");

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

function tensorTo2D(t) {
	const newarr = new Array(t.data.length);
	for (let i = 0; i < t.data.length; i++) {
		newarr[i] = [t.data[i]];
	}
	return newarr;
}
export function quantize(params, bits = 5, useMyLib = false) {
	if (bits <= 0) return Tensor.zeros(params.shape);
	if (bits > 8) throw Error();
	if (useMyLib) {
		const { centroids, assignments } = kMeans1D(params, 2 ** bits);
		assignments.codebook = centroids;
		return assignments;
	} else {
		const out = kmeans(tensorTo2D(params), 2 ** bits);
		const assignments = Tensor.$(out.clusters, params.shape, "u8");
		assignments.codebook = Tensor.$(out.centroids, [
			out.centroids.length,
			1,
		]);
		return assignments;
	}
}
