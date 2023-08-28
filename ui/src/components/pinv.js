import { Matrix, pseudoInverse, inverse } from "ml-matrix";
import { Tensor } from "./tensor";

/**
 * Returns the pseudo inverse of a tensor
 * @param {Tensor} tensor
 */
export function pinv(tensor) {
	const A = tensorToMatrix(tensor);
	const AInverse = pseudoInverse(A);
	return matrixToTensor(AInverse);
}

/**
 * Returns the pseudo inverse of a tensor
 * @param {Tensor} tensor
 */
export function inv(tensor) {
	const A = tensorToMatrix(tensor);
	const AInverse = inverse(A);
	return matrixToTensor(AInverse);
}

/**
 * @param {Matrix} matrix
 * @returns {Tensor}
 */
function matrixToTensor(matrix) {
	const [m, n] = [matrix.rows, matrix.columns];
	const tensor = Tensor.$(m * n, [m, n], "f32");
	for (let i = 0; i < m; i++) {
		for (let j = 0; j < n; j++) {
			tensor.data[tensor.index2D(i, j)] = matrix.data[i][j];
		}
	}
	return tensor;
}

/**
 * @param {Tensor} tensor
 * @returns {Matrix}
 */
function tensorToMatrix(tensor) {
	const [m, n] = tensor.shape;
	const matrix = new Matrix(m, n);
	for (let i = 0; i < m; i++) {
		for (let j = 0; j < n; j++) {
			matrix.data[i][j] = tensor.value2D(i, j);
		}
	}
	return matrix;
}
