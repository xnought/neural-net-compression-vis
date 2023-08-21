// import { GPU } from "gpu.js";

const TypedArrays = {
	f32: Float32Array,
	u8: Uint8Array,
};

class Tensor {
	constructor(data, shape, dtype = "f32", transposed = false) {
		this.data = data;
		this.shape = shape;
		this.strides = [shape[1], 1];
		this.offset = 0;
		this.codebook = undefined;
		this.dtype = dtype;
		this.transposed = transposed;
	}
	get bytes() {
		const size = this.data.byteLength / this.data.length;
		return this.shape[0] * this.shape[1] * size;
	}
	static totalBytes(...args) {
		let total = 0;
		for (const t of args) {
			total += t.bytes + (t.codebook ? t.codebook.bytes : 0);
		}
		return total;
	}
	static GB(...args) {
		return Tensor.totalBytes(...args) / 1024 ** 3;
	}
	static MB(...args) {
		return Tensor.totalBytes(...args) / 1024 ** 2;
	}
	static KB(...args) {
		return Tensor.totalBytes(...args) / 1024;
	}
	relu() {
		for (let i = 0; i < this.shape[0]; i++) {
			for (let j = 0; j < this.shape[1]; j++) {
				const v = this.data[this.index2D(i, j)];
				this.data[this.index2D(i, j)] = v > 0 ? v : 0;
			}
		}
		return this;
	}
	tanh() {
		for (let i = 0; i < this.shape[0]; i++) {
			for (let j = 0; j < this.shape[1]; j++) {
				const flatIndex =
					this.offset + i * this.strides[0] + j * this.strides[1];
				const z = this.data[flatIndex];
				const expZ = Math.exp(z);
				const expMinusZ = Math.exp(-z);
				// (e^{z} - e^{-z}) / (e^{z} + e^{-z})
				this.data[flatIndex] = (expZ - expMinusZ) / (expZ + expMinusZ);
			}
		}
		return this;
	}
	print({ round = 3, showBytes = false } = {}) {
		let outer = "";
		for (let i = 0; i < this.shape[0]; i++) {
			let substring = "|";
			for (let j = 0; j < this.shape[1]; j++) {
				let value = this.data[this.index2D(i, j)];
				if (this.dtype[0] === "u") {
					round = 0;
				}
				substring += " " + value.toFixed(round);
			}
			substring += " |";
			outer += substring + "\n";
		}
		console.log(outer, this.dtype);
		if (showBytes) {
			console.log(`${this.bytes} bytes`);
		}
	}

	get T() {
		const t = new Tensor(
			this.data,
			this.shape,
			this.dtype,
			!this.transposed
		);
		[t.shape[0], t.shape[1]] = [t.shape[1], t.shape[0]];
		t.codebook = this.codebook;
		return t;
	}
	add(other) {
		// broadcast over other
		let tempOtherStrides = [other.strides[0], other.strides[1]];
		if (this.shape[0] > other.shape[0]) {
			other.strides[0] = 0;
		}
		if (this.shape[1] > other.shape[1]) {
			other.strides[1] = 0;
		}

		// element wise add
		for (let i = 0; i < this.shape[0]; i++) {
			for (let j = 0; j < this.shape[1]; j++) {
				this.data[this.index2D(i, j)] += other.value2D(i, j);
			}
		}

		// reset broadcast
		other.strides[0] = tempOtherStrides[0];
		other.strides[1] = tempOtherStrides[1];
		return this;
	}
	index2D(i, j) {
		if (this.transposed) {
			[i, j] = [j, i];
		}
		return this.offset + this.strides[0] * i + this.strides[1] * j;
	}
	value2D(i, j) {
		const value = this.data[this.index2D(i, j)];
		return !this.codebook ? value : this.codebook.data[value];
	}
	matmul(other) {
		const m = this.shape[0];
		const inner = this.shape[1];
		const n = other.shape[1];
		assert(inner === other.shape[0], "must have same inner dimensions");
		const out = Tensor.zeros([m, n], "f32");

		// matrix multiply
		// i refers to the first matrix rows (bound by m)
		for (let i = 0; i < m; i++) {
			// j refers to the column of the outer (bound by n)
			for (let j = 0; j < n; j++) {
				// k refers to the iterator that performs the summing element wise (bound by inner)
				for (let k = 0; k < inner; k++) {
					out.data[out.index2D(i, j)] +=
						this.value2D(i, k) * other.value2D(k, j);
				}
			}
		}

		return out;
	}
	// codebookmatmulgpu(other) {
	// 	assert(
	// 		this.shape[1] === other.shape[0],
	// 		"must have same inner dimensions"
	// 	);
	// 	const gpu = new GPU({ mode: "webgl2" });
	// 	let a = this;
	// 	let b = other;
	// 	const tensorConstants = {
	// 		aShape: a.shape,
	// 		bShape: b.shape,
	// 		aStrides: a.strides,
	// 		bStrides: b.strides,
	// 		aCodebook: a.codebook.data,
	// 		bCodebook: b.codebook.data,
	// 	};
	// 	const settings = {
	// 		constants: tensorConstants,
	// 		output: [a.shape[0] * b.shape[1]],
	// 	};
	// 	const multiplyMatrix = gpu.createKernel(function (a, b) {
	// 		let sum = 0;
	// 		for (var k = 0; k < this.constants.aShape[1]; k++) {
	// 			const aIndex =
	// 				this.thread.y * this.constants.aStrides[0] +
	// 				k * this.constants.aStrides[1];
	// 			const bIndex =
	// 				k * this.constants.bStrides[0] +
	// 				this.thread.x * this.constants.bStrides[1];
	// 			sum +=
	// 				this.constants.aCodebook[a[aIndex]] *
	// 				this.constants.bCodebook[b[bIndex]];
	// 		}
	// 		return sum;
	// 	}, settings);

	// 	const out = multiplyMatrix(a.data, b.data);
	// 	const c = new Tensor(out, [a.shape[0], b.shape[1]], "f32");
	// 	gpu.destroy();
	// 	return c;
	// }
	// matmulgpu(other) {
	// 	assert(
	// 		this.shape[1] === other.shape[0],
	// 		"must have same inner dimensions"
	// 	);
	// 	const gpu = new GPU({ mode: "webgl2" });
	// 	let a = this;
	// 	let b = other;
	// 	const tensorConstants = {
	// 		aShape: a.shape,
	// 		bShape: b.shape,
	// 		aStrides: a.strides,
	// 		bStrides: b.strides,
	// 	};
	// 	const settings = {
	// 		constants: tensorConstants,
	// 		output: [a.shape[0] * b.shape[1]],
	// 	};
	// 	const multiplyMatrix = gpu.createKernel(function (a, b) {
	// 		let sum = 0;
	// 		for (var k = 0; k < this.constants.aShape[1]; k++) {
	// 			const aIndex =
	// 				this.thread.y * this.constants.aStrides[0] +
	// 				k * this.constants.aStrides[1];
	// 			const bIndex =
	// 				k * this.constants.bStrides[0] +
	// 				this.thread.x * this.constants.bStrides[1];
	// 			sum += a[aIndex] * b[bIndex];
	// 		}
	// 		return sum;
	// 	}, settings);

	// 	const out = multiplyMatrix(a.data, b.data);
	// 	const c = new Tensor(out, [a.shape[0], b.shape[1]], "f32");
	// 	gpu.destroy();
	// 	return c;
	// }

	static zeros(shape, dtype) {
		return new Tensor(Array(shape[0] * shape[1]).fill(0), shape, dtype);
	}
	static arange(shape, dtype = "f32") {
		let data = new Array(shape[0] * shape[1]);
		for (let i = 0; i < data.length; i++) {
			data[i] = i;
		}
		return new Tensor(data, shape, dtype);
	}
	static randu(shape, dtype = "f32") {
		let data = new Array(shape[0] * shape[1]);
		for (let i = 0; i < data.length; i++) {
			data[i] = Math.random();
		}
		return new Tensor(data, shape, dtype);
	}
	round() {
		for (let i = 0; i < this.data.length; i++) {
			this.data[i] = Math.round(this.data[i]);
		}
		return this;
	}
	to(_dtype) {
		this.dtype = _dtype;
		const newTypedArray = new TypedArrays[_dtype](this.data.length);
		for (let i = 0; i < this.data.length; i++) {
			newTypedArray[i] = this.data[i];
		}
		this.data = newTypedArray;
		return this;
	}
	static $(data, shape, dtype = "f32") {
		assert(dtype in TypedArrays, `type must be f32 or u8`);
		return new Tensor(new TypedArrays[dtype](data), shape, dtype);
	}
}

function assert(rule, msg = "") {
	if (!rule) {
		throw Error(msg);
	}
}

export { Tensor };
