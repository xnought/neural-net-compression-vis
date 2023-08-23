import { c as create_ssr_component, a as add_attribute, e as escape, d as each, v as validate_component } from "../../../chunks/ssr.js";
import { P as PageLayout } from "../../../chunks/CopyCode.svelte_svelte_type_style_lang.js";
import "../../../chunks/Link.svelte_svelte_type_style_lang.js";
import { L as Link } from "../../../chunks/Link.js";
import katex from "katex";
import * as d3 from "d3";
import { kmeans } from "ml-kmeans";
const KMeansImage_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".label.svelte-qipmvq{font-size:13px;margin-bottom:5px;opacity:0.7}#kmeans-container.svelte-qipmvq{display:flex;flex-direction:row;gap:20px}img.svelte-qipmvq{border-radius:5px;box-shadow:0px 0px 2px 2px #00000020}",
  map: null
};
const KMeansImage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const images = [1, 2, 4, 8, 16, 32, 64, 128, 256].map((x) => `${x}.png`);
  let { selected = 2 } = $$props;
  let { width = 300 } = $$props;
  let { showSlider = false } = $$props;
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.showSlider === void 0 && $$bindings.showSlider && showSlider !== void 0)
    $$bindings.showSlider(showSlider);
  $$result.css.add(css$2);
  return `${showSlider ? `<input type="range" min="0"${add_attribute("max", images.length - 1, 0)}${add_attribute("value", selected, 0)}> <span class="label svelte-qipmvq">${escape(2 ** selected)} colors</span>` : ``} <div id="kmeans-container" class="svelte-qipmvq"><div id="k" class="svelte-qipmvq"><div class="label svelte-qipmvq" data-svelte-h="svelte-gr914o">Compressed</div> <div><img id="compressed"${add_attribute("src", images[selected], 0)} style="${"width: " + escape(width, true) + "px;"}" class="svelte-qipmvq"></div> <div class="label svelte-qipmvq">${selected === 0 ? `${escape(2 ** selected)} color` : `${escape(2 ** selected)} colors`}</div></div> <div id="og" class="svelte-qipmvq"><div class="label svelte-qipmvq" data-svelte-h="svelte-1go56d2">Original</div> <div><img id="original" src="dog.png" style="${"width: " + escape(width, true) + "px;"}" class="svelte-qipmvq"></div> <div class="label svelte-qipmvq" data-svelte-h="svelte-b5me6g">4,824,160 colors</div></div> </div>`;
});
const ImageError_svelte_svelte_type_style_lang = "";
const ImageErrorWithNumber_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".label.svelte-1y3a1uz{font-size:13px;margin-bottom:5px;opacity:0.7}#kmeans-container.svelte-1y3a1uz{display:flex;flex-direction:row;gap:20px}canvas.svelte-1y3a1uz{border-radius:5px;box-shadow:0px 0px 2px 2px #00000020}",
  map: null
};
const ImageErrorWithNumber = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const images = [1, 2, 4, 8, 16, 32, 64, 128, 256].map((x) => `${x}.png`);
  let { selected = 0 } = $$props;
  images[selected];
  let { width = 230 } = $$props;
  let { showSlider = true } = $$props;
  let { height = 150 } = $$props;
  let error = 0;
  let canvasEl = {
    original: void 0,
    image: void 0,
    diff: void 0
  };
  async function update(image) {
  }
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.showSlider === void 0 && $$bindings.showSlider && showSlider !== void 0)
    $$bindings.showSlider(showSlider);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  $$result.css.add(css$1);
  {
    {
      images[selected];
      update();
    }
  }
  return `${showSlider ? `<input type="range" min="0"${add_attribute("max", images.length - 1, 0)}${add_attribute("value", selected, 0)}> <span class="label svelte-1y3a1uz">${escape(2 ** selected)} colors</span>` : ``} <div id="kmeans-container" class="svelte-1y3a1uz"><div id="k" class="svelte-1y3a1uz"><div class="label svelte-1y3a1uz" data-svelte-h="svelte-gr914o">Compressed</div> <div><canvas${add_attribute("width", width, 0)}${add_attribute("height", height, 0)} class="svelte-1y3a1uz"${add_attribute("this", canvasEl.image, 0)}></canvas></div></div> <div id="og" class="svelte-1y3a1uz"><div class="label svelte-1y3a1uz" data-svelte-h="svelte-1go56d2">Original</div> <div><canvas${add_attribute("width", width, 0)}${add_attribute("height", height, 0)} class="svelte-1y3a1uz"${add_attribute("this", canvasEl.original, 0)}></canvas></div></div> <div><div class="label svelte-1y3a1uz"><b>Average Error: ${escape(error.toFixed(2))}</b></div> <canvas${add_attribute("width", width, 0)}${add_attribute("height", height, 0)} class="svelte-1y3a1uz"${add_attribute("this", canvasEl.diff, 0)}></canvas></div> </div>`;
});
const KaTeX = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let html = "";
  let { big = false } = $$props;
  let { text = "c = \\pm\\sqrt{a^2 + b^2}" } = $$props;
  let { begin = "" } = $$props;
  if ($$props.big === void 0 && $$bindings.big && big !== void 0)
    $$bindings.big(big);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.begin === void 0 && $$bindings.begin && begin !== void 0)
    $$bindings.begin(begin);
  {
    {
      let insertedText = text;
      if (begin.length > 0) {
        insertedText = `\\begin{${begin}}` + insertedText + `\\end{${begin}}`;
      }
      html = katex.renderToString(insertedText.replaceAll("[", "{").replaceAll("]", "}"), {
        throwOnError: false,
        displayMode: big || begin.length > 0
      });
    }
  }
  return `<!-- HTML_TAG_START -->${html}<!-- HTML_TAG_END -->`;
});
const TypedArrays = {
  f32: Float32Array,
  u8: Uint8Array
};
class Tensor {
  constructor(data, shape, dtype = "f32", transposed = false) {
    this.data = data;
    this.shape = shape;
    this.strides = [shape[1], 1];
    this.offset = 0;
    this.codebook = void 0;
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
        const flatIndex = this.offset + i * this.strides[0] + j * this.strides[1];
        const z = this.data[flatIndex];
        const expZ = Math.exp(z);
        const expMinusZ = Math.exp(-z);
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
  deepCopy() {
    const t = new Tensor(
      deepCopyArray(this.data, TypedArrays[this.dtype]),
      deepCopyArray(this.shape, Array),
      this.dtype
    );
    return t;
  }
  self(copy) {
    return copy ? this.deepCopy() : this;
  }
  sub(other, copy = false) {
    const _this = this.self(copy);
    let tempOtherStrides = [other.strides[0], other.strides[1]];
    if (_this.shape[0] > other.shape[0]) {
      other.strides[0] = 0;
    }
    if (_this.shape[1] > other.shape[1]) {
      other.strides[1] = 0;
    }
    for (let i = 0; i < _this.shape[0]; i++) {
      for (let j = 0; j < _this.shape[1]; j++) {
        _this.data[_this.index2D(i, j)] -= other.value2D(i, j);
      }
    }
    other.strides[0] = tempOtherStrides[0];
    other.strides[1] = tempOtherStrides[1];
    return _this;
  }
  add(other) {
    let tempOtherStrides = [other.strides[0], other.strides[1]];
    if (this.shape[0] > other.shape[0]) {
      other.strides[0] = 0;
    }
    if (this.shape[1] > other.shape[1]) {
      other.strides[1] = 0;
    }
    for (let i = 0; i < this.shape[0]; i++) {
      for (let j = 0; j < this.shape[1]; j++) {
        this.data[this.index2D(i, j)] += other.value2D(i, j);
      }
    }
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
    const m2 = this.shape[0];
    const inner = this.shape[1];
    const n2 = other.shape[1];
    assert(inner === other.shape[0], "must have same inner dimensions");
    const out = Tensor.zeros([m2, n2], "f32");
    for (let i = 0; i < m2; i++) {
      for (let j = 0; j < n2; j++) {
        for (let k = 0; k < inner; k++) {
          out.data[out.index2D(i, j)] += this.value2D(i, k) * other.value2D(k, j);
        }
      }
    }
    return out;
  }
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
  static randrng(shape, rng, dtype) {
    const t = Tensor.$(shape[0] * shape[1], [shape[0], shape[1]], dtype);
    for (let i = 0; i < t.data.length; i++) {
      t.data[i] = rng();
    }
    return t;
  }
  static randu(shape, min = 0, max = 1, dtype = "f32") {
    return Tensor.randrng(shape, d3.randomUniform(min, max), dtype);
  }
  static randn(shape, mean = 0, stdvar = 1, dtype = "f32") {
    return Tensor.randrng(shape, d3.randomNormal(mean, stdvar), dtype);
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
  reconstruct() {
    const reconstructed = Tensor.zeros([this.shape[0], this.shape[1]]);
    for (let i = 0; i < this.shape[0]; i++) {
      for (let j = 0; j < this.shape[1]; j++) {
        reconstructed.data[reconstructed.index2D(i, j)] = this.value2D(
          i,
          j
        );
      }
    }
    return reconstructed;
  }
}
function assert(rule, msg = "") {
  if (!rule) {
    throw Error(msg);
  }
}
function deepCopyArray(array, ArrayConstructor) {
  const cpy = new ArrayConstructor(array.length);
  for (let i = 0; i < array.length; i++) {
    cpy[i] = array[i];
  }
  return cpy;
}
function kMeans1D(t, nClusters = 8, maxIter = 300, tol = 1e-4) {
  const n2 = t.shape[0] * t.shape[1];
  const centroids = Tensor.randu([nClusters, 1]);
  const assignments = Tensor.zeros(t.shape, "u8");
  function updateAssignments(t2, centroids2, assignments2) {
    for (let i2 = 0; i2 < n2; i2++) {
      const d = t2.data[i2];
      let closest = 0;
      let closestDist = Infinity;
      for (let j = 0; j < nClusters; j++) {
        const c = centroids2.data[j];
        const dist = (c - d) ** 2;
        if (dist < closestDist) {
          closestDist = dist;
          closest = j;
        }
      }
      assignments2.data[i2] = closest;
    }
  }
  function updateCentroids(t2, centroids2, assignments2) {
    for (let i2 = 0; i2 < nClusters; i2++) {
      let sum = 0;
      let count = 0;
      for (let j = 0; j < n2; j++) {
        if (assignments2.data[j] === i2) {
          sum += t2.data[j];
          count++;
        }
      }
      if (count > 0) {
        centroids2.data[i2] = sum / count;
      }
    }
  }
  let i = 0;
  while (i < maxIter) {
    updateAssignments(t, centroids, assignments);
    updateCentroids(t, centroids, assignments);
    i++;
  }
  return {
    centroids,
    assignments
  };
}
function tensorTo2D(t) {
  const newarr = new Array(t.data.length);
  for (let i = 0; i < t.data.length; i++) {
    newarr[i] = [t.data[i]];
  }
  return newarr;
}
function quantize(params, bits = 5, useMyLib = false) {
  if (bits <= 0)
    return Tensor.zeros(params.shape);
  if (bits > 8)
    throw Error();
  if (useMyLib) {
    const { centroids, assignments } = kMeans1D(params, 2 ** bits);
    assignments.codebook = centroids;
    return assignments;
  } else {
    const out = kmeans(tensorTo2D(params), 2 ** bits);
    const assignments = Tensor.$(out.clusters, params.shape, "u8");
    assignments.codebook = Tensor.$(out.centroids, [
      out.centroids.length,
      1
    ]);
    return assignments;
  }
}
function toJson$1(data, shape, label = "Original Weights") {
  let total = [];
  for (let i = 0; i < shape[0]; i++) {
    for (let j = 0; j < shape[1]; j++) {
      let entry = {
        i,
        j,
        weight: data[i * shape[1] + j],
        label
      };
      total.push(entry);
    }
  }
  return total;
}
const Heatmap = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let div;
  let { data } = $$props;
  let { data2 = null } = $$props;
  let { shape = [10, 10] } = $$props;
  let { width = void 0 } = $$props;
  let { height = void 0 } = $$props;
  let { style = "background: none;" } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.data2 === void 0 && $$bindings.data2 && data2 !== void 0)
    $$bindings.data2(data2);
  if ($$props.shape === void 0 && $$bindings.shape && shape !== void 0)
    $$bindings.shape(shape);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  {
    {
      if (data) {
        let d = toJson$1(data, shape);
        if (data2) {
          d = d.concat(toJson$1(data2, shape, "Quantized Weights"));
        }
      }
    }
  }
  return `<div role="img"${add_attribute("this", div, 0)}></div>`;
});
function toJson(data, shape, label = "Original Weights") {
  let total = [];
  for (let i = 0; i < shape[0]; i++) {
    for (let j = 0; j < shape[1]; j++) {
      let entry = {
        i,
        j,
        weight: data[i * shape[1] + j],
        label
      };
      total.push(entry);
    }
  }
  return total;
}
const Dist = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let div;
  let { data } = $$props;
  let { data2 = null } = $$props;
  let { shape = [10, 10] } = $$props;
  let { width = void 0 } = $$props;
  let { height = void 0 } = $$props;
  let { style = "background: none;" } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.data2 === void 0 && $$bindings.data2 && data2 !== void 0)
    $$bindings.data2(data2);
  if ($$props.shape === void 0 && $$bindings.shape && shape !== void 0)
    $$bindings.shape(shape);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  {
    {
      if (data) {
        let d = toJson(data, shape);
        if (data2) {
          d = d.concat(toJson(data2, shape, "Quantized Weights"));
        }
      }
    }
  }
  return `<div role="img"${add_attribute("this", div, 0)}></div>`;
});
const ErrorBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let div;
  let { data = [{ error: 0, label: "Operator Norm" }] } = $$props;
  let { width = void 0 } = $$props;
  let { height = void 0 } = $$props;
  let { style = "background: none;" } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  return `<div role="img"${add_attribute("this", div, 0)}></div>`;
});
const m = 15, n = 15;
function matrixOperator1Norm(t) {
  let maxSum = -Infinity;
  for (let j = 0; j < t.shape[1]; j++) {
    for (let i = 0; i < t.shape[0]; i++) {
      const sum = Math.abs(t.value2D(i, j));
      if (sum > maxSum)
        maxSum = sum;
    }
  }
  return maxSum;
}
function quantizationError(W, Q) {
  return matrixOperator1Norm(W.sub(Q, true)) / matrixOperator1Norm(W);
}
const KMeansLive = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let data;
  let quant;
  let error;
  const dataOptions = {
    uniform: Tensor.randu([m, n], -2, 2),
    normal: Tensor.randn([m, n], 0, 1),
    outlier: extremeOutliers(Tensor.randn([m, n], 0, 1), 25, 1)
  };
  let selected = "normal";
  let bits = 1;
  const cache = {};
  function quantizeOrFromCache(selected2, data2, bits2) {
    const key = `${selected2}-${bits2}`;
    if (!(key in cache)) {
      cache[key] = quantize(data2, bits2);
    }
    return cache[key];
  }
  function extremeOutliers(t, value = 10, times = 1) {
    for (let i = 0; i < times; i++) {
      const m2 = d3.randomInt(t.shape[0] - 1)();
      const n2 = d3.randomInt(t.shape[1] - 1)();
      t.data[t.index2D(m2, n2)] = value;
    }
    return t;
  }
  data = dataOptions[selected];
  quant = quantizeOrFromCache(selected, data, bits);
  error = quantizationError(data, quant);
  return `<select>${each(Object.keys(dataOptions), (opt) => {
    return `<option${add_attribute("value", opt, 0)}>${escape(opt)}</option>`;
  })}</select> <input type="range" min="0" max="7"${add_attribute("value", bits, 0)}> ${escape(bits)} bits
${data ? (() => {
    let quantizedData = quant.reconstruct();
    return ` ${validate_component(Heatmap, "Heatmap").$$render(
      $$result,
      {
        data: data.data,
        data2: quantizedData.data,
        shape: [m, n],
        height: 200
      },
      {},
      {}
    )} ${validate_component(Dist, "Dist").$$render(
      $$result,
      {
        data: data.data,
        data2: quantizedData.data,
        shape: [m, n],
        height: 200
      },
      {},
      {}
    )}`;
  })() : ``} ${validate_component(ErrorBar, "ErrorBar").$$render(
    $$result,
    {
      data: [{ label: "||W-C||/||W||", error }]
    },
    {},
    {}
  )}`;
});
const _page_md_svelte_type_style_lang = "";
const css = {
  code: "img.svelte-1goh1mc{width:100%;border-radius:5px;box-shadow:0px 0px 2px 2px #00000020}.thumb.svelte-1goh1mc{height:100%;min-height:200px;margin-right:20px;background-size:cover;background-position:top left;transition-property:background, box-shadow;transition-duration:1.5s;transition-timing-function:ease;transition-delay:0s;border-radius:5px;box-shadow:0px -1px 2px 2px #00000020}.thumb.svelte-1goh1mc:hover{background-position:bottom left;box-shadow:0px 1px 2px 2px #00000020}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const fm = {
    "pageType": "md",
    "lastUpdate": "August 2023",
    "title": "On Compressing Weights",
    "anchors": [
      {
        "slugId": "Big-indeed",
        "title": "Big indeed",
        "depth": 2
      },
      {
        "slugId": "Sharing",
        "title": "Sharing",
        "depth": 2
      },
      {
        "slugId": "Sharing-Image-Pixels",
        "title": "Sharing Image Pixels",
        "depth": 2
      },
      {
        "slugId": "Humans-are-too-good",
        "title": "Humans are too good",
        "depth": 2
      },
      {
        "slugId": "Assigning-a-number-to-error",
        "title": "Assigning a number to error",
        "depth": 2
      },
      {
        "slugId": "Neural-Network-Weights",
        "title": "Neural Network Weights",
        "depth": 2
      },
      {
        "slugId": "Size-of-error",
        "title": "Size of error",
        "depth": 2
      },
      {
        "slugId": "Error-on-different-distributions",
        "title": "Error on different distributions",
        "depth": 2
      }
    ]
  };
  $$result.css.add(css);
  return `${validate_component(PageLayout, "PageLayout").$$render($$result, { fm }, {}, {
    default: () => {
      return `<p data-svelte-h="svelte-l5xg0z">How does compressing your neural network weights change the outputs? This article attempts to build up a good way to think about model compression and the fundamental operations that are affected. From as close to first principles logic as possible.</p> <div id="Big-indeed" class="svp-anchor-item"></div> <h2 data-svelte-h="svelte-xa57bu"><a href="#Big-indeed" class="svp-title-anchor" aria-label="Big indeed"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path d="M280 341.1l-1.2.1c-3.6.4-7 2-9.6 4.5l-64.6 64.6c-13.7 13.7-32 21.2-51.5 21.2s-37.8-7.5-51.5-21.2c-13.7-13.7-21.2-32-21.2-51.5s7.5-37.8 21.2-51.5l68.6-68.6c3.5-3.5 7.3-6.6 11.4-9.3 4.6-3 9.6-5.6 14.8-7.5 4.8-1.8 9.9-3 15-3.7 3.4-.5 6.9-.7 10.2-.7 1.4 0 2.8.1 4.6.2 17.7 1.1 34.4 8.6 46.8 21 7.7 7.7 13.6 17.1 17.1 27.3 2.8 8 11.2 12.5 19.3 10.1.1 0 .2-.1.3-.1.1 0 .2 0 .2-.1 8.1-2.5 12.8-11 10.5-19.1-4.4-15.6-12.2-28.7-24.6-41-15.6-15.6-35.9-25.8-57.6-29.3-1.9-.3-3.8-.6-5.7-.8-3.7-.4-7.4-.6-11.1-.6-2.6 0-5.2.1-7.7.3-5.4.4-10.8 1.2-16.2 2.5-1.1.2-2.1.5-3.2.8-6.7 1.8-13.3 4.2-19.5 7.3-10.3 5.1-19.6 11.7-27.7 19.9l-68.6 68.6C58.9 304.4 48 330.8 48 359c0 28.2 10.9 54.6 30.7 74.4C98.5 453.1 124.9 464 153 464c28.2 0 54.6-10.9 74.4-30.7l65.3-65.3c10.4-10.5 2-28.3-12.7-26.9z" fill="currentColor"></path><path d="M433.3 78.7C413.5 58.9 387.1 48 359 48s-54.6 10.9-74.4 30.7l-63.7 63.7c-9.7 9.7-3.6 26.3 10.1 27.4 4.7.4 9.3-1.3 12.7-4.6l63.8-63.6c13.7-13.7 32-21.2 51.5-21.2s37.8 7.5 51.5 21.2c13.7 13.7 21.2 32 21.2 51.5s-7.5 37.8-21.2 51.5l-68.6 68.6c-3.5 3.5-7.3 6.6-11.4 9.3-4.6 3-9.6 5.6-14.8 7.5-4.8 1.8-9.9 3-15 3.7-3.4.5-6.9.7-10.2.7-1.4 0-2.9-.1-4.6-.2-17.7-1.1-34.4-8.6-46.8-21-7.3-7.3-12.8-16-16.4-25.5-2.9-7.7-11.1-11.9-19.1-9.8-8.9 2.3-14.1 11.7-11.3 20.5 4.5 14 12.1 25.9 23.7 37.5l.2.2c16.9 16.9 39.4 27.6 63.3 30.1 3.7.4 7.4.6 11.1.6 2.6 0 5.2-.1 7.8-.3 6.5-.5 13-1.6 19.3-3.2 6.7-1.8 13.3-4.2 19.5-7.3 10.3-5.1 19.6-11.7 27.7-19.9l68.6-68.6c19.8-19.8 30.7-46.2 30.7-74.4s-11.1-54.6-30.9-74.4z" fill="currentColor"></path></svg></a>Big indeed</h2> <p data-svelte-h="svelte-hj5ywf">Modern deep learning is quite extraordinary. I don&#39;t need to convince you, you&#39;ve probably seen the latest generative art models and other incredible models that blow your socks off.</p> <div style="background-image: url(taller.png);height: 50px;" class="thumb svelte-1goh1mc"></div> <p><em>From ${validate_component(Link, "Link").$$render(
        $$result,
        {
          to: "https://lexica.art/?q=34e00886-6b4f-47fe-a9b9-9f4e630bbb28",
          label: "Lexica"
        },
        {},
        {}
      )}&#39;s Aperture Model.</em></p> <p>The funny thing is that these networks are just transforming the inputs over and over again until a desirable output. To create really complex outputs (like generative art), you thus need a reasonable amount of transformations. So it&#39;s not at all surprising that models like ${validate_component(Link, "Link").$$render(
        $$result,
        {
          to: "https://stability.ai/stablediffusion",
          label: "Stable Diffusion XL"
        },
        {},
        {}
      )} have over 3 billion weights!</p> <p data-svelte-h="svelte-ezga5t">Likely the average consumer (you and me) can&#39;t run these models on our computers alone. They just won&#39;t fit in RAM, and even if they do, it might take a century to produce one generation.</p> <p data-svelte-h="svelte-1h2dlac">Luckily, there are strategies to cope with the size. Namely, model quantization: the act of converting floating point weights into small integers. With quantization you can reasonably reduce the model size by 4x or more.</p> <p data-svelte-h="svelte-6hfup0">If the outputs of the model aren&#39;t changed too much, the compression is a total win! Now more people can run these incredible models!</p> <div id="Sharing" class="svp-anchor-item"></div> <h2 data-svelte-h="svelte-d3nha6"><a href="#Sharing" class="svp-title-anchor" aria-label="Sharing"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path d="M280 341.1l-1.2.1c-3.6.4-7 2-9.6 4.5l-64.6 64.6c-13.7 13.7-32 21.2-51.5 21.2s-37.8-7.5-51.5-21.2c-13.7-13.7-21.2-32-21.2-51.5s7.5-37.8 21.2-51.5l68.6-68.6c3.5-3.5 7.3-6.6 11.4-9.3 4.6-3 9.6-5.6 14.8-7.5 4.8-1.8 9.9-3 15-3.7 3.4-.5 6.9-.7 10.2-.7 1.4 0 2.8.1 4.6.2 17.7 1.1 34.4 8.6 46.8 21 7.7 7.7 13.6 17.1 17.1 27.3 2.8 8 11.2 12.5 19.3 10.1.1 0 .2-.1.3-.1.1 0 .2 0 .2-.1 8.1-2.5 12.8-11 10.5-19.1-4.4-15.6-12.2-28.7-24.6-41-15.6-15.6-35.9-25.8-57.6-29.3-1.9-.3-3.8-.6-5.7-.8-3.7-.4-7.4-.6-11.1-.6-2.6 0-5.2.1-7.7.3-5.4.4-10.8 1.2-16.2 2.5-1.1.2-2.1.5-3.2.8-6.7 1.8-13.3 4.2-19.5 7.3-10.3 5.1-19.6 11.7-27.7 19.9l-68.6 68.6C58.9 304.4 48 330.8 48 359c0 28.2 10.9 54.6 30.7 74.4C98.5 453.1 124.9 464 153 464c28.2 0 54.6-10.9 74.4-30.7l65.3-65.3c10.4-10.5 2-28.3-12.7-26.9z" fill="currentColor"></path><path d="M433.3 78.7C413.5 58.9 387.1 48 359 48s-54.6 10.9-74.4 30.7l-63.7 63.7c-9.7 9.7-3.6 26.3 10.1 27.4 4.7.4 9.3-1.3 12.7-4.6l63.8-63.6c13.7-13.7 32-21.2 51.5-21.2s37.8 7.5 51.5 21.2c13.7 13.7 21.2 32 21.2 51.5s-7.5 37.8-21.2 51.5l-68.6 68.6c-3.5 3.5-7.3 6.6-11.4 9.3-4.6 3-9.6 5.6-14.8 7.5-4.8 1.8-9.9 3-15 3.7-3.4.5-6.9.7-10.2.7-1.4 0-2.9-.1-4.6-.2-17.7-1.1-34.4-8.6-46.8-21-7.3-7.3-12.8-16-16.4-25.5-2.9-7.7-11.1-11.9-19.1-9.8-8.9 2.3-14.1 11.7-11.3 20.5 4.5 14 12.1 25.9 23.7 37.5l.2.2c16.9 16.9 39.4 27.6 63.3 30.1 3.7.4 7.4.6 11.1.6 2.6 0 5.2-.1 7.8-.3 6.5-.5 13-1.6 19.3-3.2 6.7-1.8 13.3-4.2 19.5-7.3 10.3-5.1 19.6-11.7 27.7-19.9l68.6-68.6c19.8-19.8 30.7-46.2 30.7-74.4s-11.1-54.6-30.9-74.4z" fill="currentColor"></path></svg></a>Sharing</h2> <p data-svelte-h="svelte-jjbxih">Suppose you owned 20 dogs. An army of golden retrievers. And also suppose you are on the market for dog toys.</p> <p data-svelte-h="svelte-tah7uk">Should you buy 20 toys for all 20 dogs? That would be quite expensive! If we clock each toy at 20$, then you&#39;d pay 400$.</p> <p data-svelte-h="svelte-1in898t">Or you could reason that buying 5 toys would be fine. Not all 20 dogs are playing with their toy at once. They could share! Now your bill would only be 100$.</p> <p data-svelte-h="svelte-4ve7ev">The basic principle is that sharing may be good enough under constraints.</p> <div id="Sharing-Image-Pixels" class="svp-anchor-item"></div> <h2 data-svelte-h="svelte-qu7ffk"><a href="#Sharing-Image-Pixels" class="svp-title-anchor" aria-label="Sharing Image Pixels"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path d="M280 341.1l-1.2.1c-3.6.4-7 2-9.6 4.5l-64.6 64.6c-13.7 13.7-32 21.2-51.5 21.2s-37.8-7.5-51.5-21.2c-13.7-13.7-21.2-32-21.2-51.5s7.5-37.8 21.2-51.5l68.6-68.6c3.5-3.5 7.3-6.6 11.4-9.3 4.6-3 9.6-5.6 14.8-7.5 4.8-1.8 9.9-3 15-3.7 3.4-.5 6.9-.7 10.2-.7 1.4 0 2.8.1 4.6.2 17.7 1.1 34.4 8.6 46.8 21 7.7 7.7 13.6 17.1 17.1 27.3 2.8 8 11.2 12.5 19.3 10.1.1 0 .2-.1.3-.1.1 0 .2 0 .2-.1 8.1-2.5 12.8-11 10.5-19.1-4.4-15.6-12.2-28.7-24.6-41-15.6-15.6-35.9-25.8-57.6-29.3-1.9-.3-3.8-.6-5.7-.8-3.7-.4-7.4-.6-11.1-.6-2.6 0-5.2.1-7.7.3-5.4.4-10.8 1.2-16.2 2.5-1.1.2-2.1.5-3.2.8-6.7 1.8-13.3 4.2-19.5 7.3-10.3 5.1-19.6 11.7-27.7 19.9l-68.6 68.6C58.9 304.4 48 330.8 48 359c0 28.2 10.9 54.6 30.7 74.4C98.5 453.1 124.9 464 153 464c28.2 0 54.6-10.9 74.4-30.7l65.3-65.3c10.4-10.5 2-28.3-12.7-26.9z" fill="currentColor"></path><path d="M433.3 78.7C413.5 58.9 387.1 48 359 48s-54.6 10.9-74.4 30.7l-63.7 63.7c-9.7 9.7-3.6 26.3 10.1 27.4 4.7.4 9.3-1.3 12.7-4.6l63.8-63.6c13.7-13.7 32-21.2 51.5-21.2s37.8 7.5 51.5 21.2c13.7 13.7 21.2 32 21.2 51.5s-7.5 37.8-21.2 51.5l-68.6 68.6c-3.5 3.5-7.3 6.6-11.4 9.3-4.6 3-9.6 5.6-14.8 7.5-4.8 1.8-9.9 3-15 3.7-3.4.5-6.9.7-10.2.7-1.4 0-2.9-.1-4.6-.2-17.7-1.1-34.4-8.6-46.8-21-7.3-7.3-12.8-16-16.4-25.5-2.9-7.7-11.1-11.9-19.1-9.8-8.9 2.3-14.1 11.7-11.3 20.5 4.5 14 12.1 25.9 23.7 37.5l.2.2c16.9 16.9 39.4 27.6 63.3 30.1 3.7.4 7.4.6 11.1.6 2.6 0 5.2-.1 7.8-.3 6.5-.5 13-1.6 19.3-3.2 6.7-1.8 13.3-4.2 19.5-7.3 10.3-5.1 19.6-11.7 27.7-19.9l68.6-68.6c19.8-19.8 30.7-46.2 30.7-74.4s-11.1-54.6-30.9-74.4z" fill="currentColor"></path></svg></a>Sharing Image Pixels</h2> <p data-svelte-h="svelte-rvxuu4">How can sharing be applied to reduce image size? Images are represented pretty closely to neural networks, so this is a tangent, but in a way it&#39;s not. Pay attention these intuitions will be helpful!</p> <p data-svelte-h="svelte-hycxe9">As you know, images are made up of tons of small colored squares: pixels. I&#39;ll start with a 880 pixels wide by 602 pixels tall image of this cutest golden retriever you&#39;ve ever seen.</p> <img src="dog.png" style="width: 300px;" class="svelte-1goh1mc"> <p>If I had enough time, I could count how many pixels there are and find there are almost five million! Or if I just remembered how to multiply, I&#39;d multiply the width times the height to get the total number as ${validate_component(KaTeX, "Math").$$render($$result, { text: "808 \\cdot 602 = 4,824,160" }, {}, {})} pixels, which is just under five million pixels. Ah whatever, I&#39;m in a rounding mood.</p> <p data-svelte-h="svelte-5au9uu">Remember, each pixel is one color. And each color is represented by three numbers: <span style="color: rgb(255, 0, 0)">red</span>, <span style="color: rgb(0, 255, 0)">green</span>, and <span style="color: rgb(0, 0, 255)">blue</span>. So if there are around five million pixels and each pixel has three numbers, than in total there are about 15 million numbers in that image<sup><a href="#user-content-fn-1" id="user-content-fnref-1" data-footnote-ref aria-describedby="footnote-label">1</a></sup>.</p> <div class="admonition admonition-tip" data-svelte-h="svelte-1a82q3s"><div class="admonition-heading"><span class="admonition-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M14.5 9.5C14.5 6.47 12.03 4 9 4S3.5 6.47 3.5 9.5c0 2.47 1.49 3.89 2.35 4.5h6.3c.86-.61 2.35-2.03 2.35-4.5z" opacity=".3"></path><path fill="currentColor" d="M7 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm-2-1h8v-2H5v2zm11.5-9.5c0 3.82-2.66 5.86-3.77 6.5H5.27c-1.11-.64-3.77-2.68-3.77-6.5C1.5 5.36 4.86 2 9 2s7.5 3.36 7.5 7.5zm-2 0C14.5 6.47 12.03 4 9 4S3.5 6.47 3.5 9.5c0 2.47 1.49 3.89 2.35 4.5h6.3c.86-.61 2.35-2.03 2.35-4.5zm6.87-2.13L20 8l1.37.63L22 10l.63-1.37L24 8l-1.37-.63L22 6l-.63 1.37zM19 6l.94-2.06L22 3l-2.06-.94L19 0l-.94 2.06L16 3l2.06.94L19 6z"></path></svg></span>think</div><div class="admonition-content"><p>How can we apply sharing to the pixels?</p></div></div> <p data-svelte-h="svelte-ugxtk2">In order to share the pixels, we need to constrain them into a few important ones. Getting one color is easy. We can just take the average over all the pixels to get the most important color. Then, I can assign each pixel one number that indexes into my shared colors. In this case there is only one.</p> ${validate_component(KMeansImage, "KMeansImage").$$render($$result, { selected: 0 }, {}, {})} <p data-svelte-h="svelte-11ymj22">Now, what if I want two colors? In other words, if all the pixels could only share the two colors, what would the image look like?</p> ${validate_component(KMeansImage, "KMeansImage").$$render($$result, { selected: 1 }, {}, {})} <p data-svelte-h="svelte-1cscpqo">That is starting to look like a dog!</p> <div class="admonition admonition-important" data-svelte-h="svelte-h7d7y0"><div class="admonition-heading"><span class="admonition-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 12 12"><path fill="currentColor" d="M4.283 2.98a1.735 1.735 0 1 1 3.434 0l-.576 4.03a1.153 1.153 0 0 1-2.282 0l-.576-4.03Zm2.444-.142a.735.735 0 1 0-1.454 0l.576 4.03a.153.153 0 0 0 .303 0l.575-4.03ZM6 11a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"></path></svg></span>your turn</div><div class="admonition-content"><p>Drag the slider to increase the number of colors to share. When does the image start to look like the original?</p></div></div> ${validate_component(KMeansImage, "KMeansImage").$$render($$result, { selected: 1, showSlider: true }, {}, {})} <p data-svelte-h="svelte-1py1sum">128 colors looks mighty close to the original image!</p> <p data-svelte-h="svelte-g0k7p7">To convert these savings to actual usable numbers, I can quickly compute each file size.</p> <p data-svelte-h="svelte-ssbfn7">Remember, each pixel still needs to reference which of the 128 colors to use for the quantized version. So we still need to keep one byte per each pixel. Then when you need to access the pixel, you can use the number to index into the 128 colors.</p> <p>So each shared color still has three number that represents the number and then one number per pixel to index into that codebook gives us ${validate_component(KaTeX, "Math").$$render(
        $$result,
        {
          text: "128 \\cdot 3 \\cdot 4824160=4824544"
        },
        {},
        {}
      )} or 4,824,544 bytes.</p> <p data-svelte-h="svelte-ikkivg">Now the original was roughly 15 million numbers (and in this case bytes). That is a 3x space savings and the images look almost the same!</p> <div class="admonition admonition-note"><div class="admonition-heading" data-svelte-h="svelte-1cy0qbn"><span class="admonition-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M7 17h2.1l6-5.95l-2.15-2.15L7 14.85Zm8.8-6.65l1.05-1.1Q17 9.1 17 8.9q0-.2-.15-.35l-1.4-1.4Q15.3 7 15.1 7q-.2 0-.35.15l-1.1 1.05ZM5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h4.2q.325-.9 1.088-1.45Q11.05 1 12 1t1.713.55Q14.475 2.1 14.8 3H19q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Zm0-2h14V5H5v14Zm7-14.75q.325 0 .538-.213q.212-.212.212-.537q0-.325-.212-.538q-.213-.212-.538-.212q-.325 0-.537.212q-.213.213-.213.538q0 .325.213.537q.212.213.537.213ZM5 19V5v14Z"></path></svg></span>NOTE</div><div class="admonition-content"><p data-svelte-h="svelte-1b2zkjk">I&#39;ve left out some information on how to compute these multiple averages.</p><p data-svelte-h="svelte-1pybshj"><strong>For the purposes of this article, you can ignore how I compute the averages.</strong></p><p>However, if you must know I use the ${validate_component(Link, "Link").$$render(
        $$result,
        {
          to: "https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html",
          label: "k-means algorithm"
        },
        {},
        {}
      )} on the image pixels to select out the top k average colors and assign each pixel one of those k colors.</p></div></div> <div id="Humans-are-too-good" class="svp-anchor-item"></div> <h2 data-svelte-h="svelte-zhj2o8"><a href="#Humans-are-too-good" class="svp-title-anchor" aria-label="Humans are too good"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path d="M280 341.1l-1.2.1c-3.6.4-7 2-9.6 4.5l-64.6 64.6c-13.7 13.7-32 21.2-51.5 21.2s-37.8-7.5-51.5-21.2c-13.7-13.7-21.2-32-21.2-51.5s7.5-37.8 21.2-51.5l68.6-68.6c3.5-3.5 7.3-6.6 11.4-9.3 4.6-3 9.6-5.6 14.8-7.5 4.8-1.8 9.9-3 15-3.7 3.4-.5 6.9-.7 10.2-.7 1.4 0 2.8.1 4.6.2 17.7 1.1 34.4 8.6 46.8 21 7.7 7.7 13.6 17.1 17.1 27.3 2.8 8 11.2 12.5 19.3 10.1.1 0 .2-.1.3-.1.1 0 .2 0 .2-.1 8.1-2.5 12.8-11 10.5-19.1-4.4-15.6-12.2-28.7-24.6-41-15.6-15.6-35.9-25.8-57.6-29.3-1.9-.3-3.8-.6-5.7-.8-3.7-.4-7.4-.6-11.1-.6-2.6 0-5.2.1-7.7.3-5.4.4-10.8 1.2-16.2 2.5-1.1.2-2.1.5-3.2.8-6.7 1.8-13.3 4.2-19.5 7.3-10.3 5.1-19.6 11.7-27.7 19.9l-68.6 68.6C58.9 304.4 48 330.8 48 359c0 28.2 10.9 54.6 30.7 74.4C98.5 453.1 124.9 464 153 464c28.2 0 54.6-10.9 74.4-30.7l65.3-65.3c10.4-10.5 2-28.3-12.7-26.9z" fill="currentColor"></path><path d="M433.3 78.7C413.5 58.9 387.1 48 359 48s-54.6 10.9-74.4 30.7l-63.7 63.7c-9.7 9.7-3.6 26.3 10.1 27.4 4.7.4 9.3-1.3 12.7-4.6l63.8-63.6c13.7-13.7 32-21.2 51.5-21.2s37.8 7.5 51.5 21.2c13.7 13.7 21.2 32 21.2 51.5s-7.5 37.8-21.2 51.5l-68.6 68.6c-3.5 3.5-7.3 6.6-11.4 9.3-4.6 3-9.6 5.6-14.8 7.5-4.8 1.8-9.9 3-15 3.7-3.4.5-6.9.7-10.2.7-1.4 0-2.9-.1-4.6-.2-17.7-1.1-34.4-8.6-46.8-21-7.3-7.3-12.8-16-16.4-25.5-2.9-7.7-11.1-11.9-19.1-9.8-8.9 2.3-14.1 11.7-11.3 20.5 4.5 14 12.1 25.9 23.7 37.5l.2.2c16.9 16.9 39.4 27.6 63.3 30.1 3.7.4 7.4.6 11.1.6 2.6 0 5.2-.1 7.8-.3 6.5-.5 13-1.6 19.3-3.2 6.7-1.8 13.3-4.2 19.5-7.3 10.3-5.1 19.6-11.7 27.7-19.9l68.6-68.6c19.8-19.8 30.7-46.2 30.7-74.4s-11.1-54.6-30.9-74.4z" fill="currentColor"></path></svg></a>Humans are too good</h2> <p data-svelte-h="svelte-1mtmpwb">At what point did you think that the quantized image looked close to the original? Answering for myself, it just looked closer to the original. What does that really mean?</p> <p data-svelte-h="svelte-auwk48">Do you see the issue? If we plan to apply these quantization methods to neural network weights, how do we know when to stop or even if we should quantize at all?</p> <p data-svelte-h="svelte-1plqerq">First off, quantizing and compressing stuff depends on the usecase of whatever you&#39;re compressing. In the image case, it needed to look indistinguishable from the original to humans.</p> <div class="admonition admonition-tip" data-svelte-h="svelte-cqhrte"><div class="admonition-heading"><span class="admonition-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M14.5 9.5C14.5 6.47 12.03 4 9 4S3.5 6.47 3.5 9.5c0 2.47 1.49 3.89 2.35 4.5h6.3c.86-.61 2.35-2.03 2.35-4.5z" opacity=".3"></path><path fill="currentColor" d="M7 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm-2-1h8v-2H5v2zm11.5-9.5c0 3.82-2.66 5.86-3.77 6.5H5.27c-1.11-.64-3.77-2.68-3.77-6.5C1.5 5.36 4.86 2 9 2s7.5 3.36 7.5 7.5zm-2 0C14.5 6.47 12.03 4 9 4S3.5 6.47 3.5 9.5c0 2.47 1.49 3.89 2.35 4.5h6.3c.86-.61 2.35-2.03 2.35-4.5zm6.87-2.13L20 8l1.37.63L22 10l.63-1.37L24 8l-1.37-.63L22 6l-.63 1.37zM19 6l.94-2.06L22 3l-2.06-.94L19 0l-.94 2.06L16 3l2.06.94L19 6z"></path></svg></span>think</div><div class="admonition-content"><p>What is the usecase of weights in neural networks? How would quantization affect them?</p></div></div> <div id="Assigning-a-number-to-error" class="svp-anchor-item"></div> <h2 data-svelte-h="svelte-1gb0w5w"><a href="#Assigning-a-number-to-error" class="svp-title-anchor" aria-label="Assigning a number to error"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path d="M280 341.1l-1.2.1c-3.6.4-7 2-9.6 4.5l-64.6 64.6c-13.7 13.7-32 21.2-51.5 21.2s-37.8-7.5-51.5-21.2c-13.7-13.7-21.2-32-21.2-51.5s7.5-37.8 21.2-51.5l68.6-68.6c3.5-3.5 7.3-6.6 11.4-9.3 4.6-3 9.6-5.6 14.8-7.5 4.8-1.8 9.9-3 15-3.7 3.4-.5 6.9-.7 10.2-.7 1.4 0 2.8.1 4.6.2 17.7 1.1 34.4 8.6 46.8 21 7.7 7.7 13.6 17.1 17.1 27.3 2.8 8 11.2 12.5 19.3 10.1.1 0 .2-.1.3-.1.1 0 .2 0 .2-.1 8.1-2.5 12.8-11 10.5-19.1-4.4-15.6-12.2-28.7-24.6-41-15.6-15.6-35.9-25.8-57.6-29.3-1.9-.3-3.8-.6-5.7-.8-3.7-.4-7.4-.6-11.1-.6-2.6 0-5.2.1-7.7.3-5.4.4-10.8 1.2-16.2 2.5-1.1.2-2.1.5-3.2.8-6.7 1.8-13.3 4.2-19.5 7.3-10.3 5.1-19.6 11.7-27.7 19.9l-68.6 68.6C58.9 304.4 48 330.8 48 359c0 28.2 10.9 54.6 30.7 74.4C98.5 453.1 124.9 464 153 464c28.2 0 54.6-10.9 74.4-30.7l65.3-65.3c10.4-10.5 2-28.3-12.7-26.9z" fill="currentColor"></path><path d="M433.3 78.7C413.5 58.9 387.1 48 359 48s-54.6 10.9-74.4 30.7l-63.7 63.7c-9.7 9.7-3.6 26.3 10.1 27.4 4.7.4 9.3-1.3 12.7-4.6l63.8-63.6c13.7-13.7 32-21.2 51.5-21.2s37.8 7.5 51.5 21.2c13.7 13.7 21.2 32 21.2 51.5s-7.5 37.8-21.2 51.5l-68.6 68.6c-3.5 3.5-7.3 6.6-11.4 9.3-4.6 3-9.6 5.6-14.8 7.5-4.8 1.8-9.9 3-15 3.7-3.4.5-6.9.7-10.2.7-1.4 0-2.9-.1-4.6-.2-17.7-1.1-34.4-8.6-46.8-21-7.3-7.3-12.8-16-16.4-25.5-2.9-7.7-11.1-11.9-19.1-9.8-8.9 2.3-14.1 11.7-11.3 20.5 4.5 14 12.1 25.9 23.7 37.5l.2.2c16.9 16.9 39.4 27.6 63.3 30.1 3.7.4 7.4.6 11.1.6 2.6 0 5.2-.1 7.8-.3 6.5-.5 13-1.6 19.3-3.2 6.7-1.8 13.3-4.2 19.5-7.3 10.3-5.1 19.6-11.7 27.7-19.9l68.6-68.6c19.8-19.8 30.7-46.2 30.7-74.4s-11.1-54.6-30.9-74.4z" fill="currentColor"></path></svg></a>Assigning a number to error</h2> <p data-svelte-h="svelte-17j8ye9">Before we get to the heart of the issue, I&#39;ll quickly show you what an error metric may look like for the image case.</p> <p data-svelte-h="svelte-kl8qdo">I could assume that I as a human see the error when the colors diverge greatly from the original image.</p> <p data-svelte-h="svelte-2tm1p4">So I could find the absolute difference between the compressed and original pixels. Then visualize places where the error is still high. Furthermore, I can compress the error values into one number with an average.</p> <div class="admonition admonition-important" data-svelte-h="svelte-1b0udpq"><div class="admonition-heading"><span class="admonition-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 12 12"><path fill="currentColor" d="M4.283 2.98a1.735 1.735 0 1 1 3.434 0l-.576 4.03a1.153 1.153 0 0 1-2.282 0l-.576-4.03Zm2.444-.142a.735.735 0 1 0-1.454 0l.576 4.03a.153.153 0 0 0 .303 0l.575-4.03ZM6 11a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"></path></svg></span>your turn</div><div class="admonition-content"><p>Drag the slider increase the number of colors quantized. Observe the places with high error.</p></div></div> ${validate_component(ImageErrorWithNumber, "ImageErrorWithNumber").$$render($$result, {}, {}, {})} <p data-svelte-h="svelte-10jxutl">As the <strong>Average Error</strong> decreases (which is the average deviation from the original pixel color), we see the error image virtually disappears.</p> <p data-svelte-h="svelte-1d652h4">So as long as we attach a meaningful number to the error, we can decide when it&#39;s a good idea, and how to improve our methods to quantize/compress better.</p> <p data-svelte-h="svelte-6bu27r">But you must keep in mind the original usecase/application like we&#39;ve done here with the image!</p> <div class="admonition admonition-note"><div class="admonition-heading" data-svelte-h="svelte-1cy0qbn"><span class="admonition-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M7 17h2.1l6-5.95l-2.15-2.15L7 14.85Zm8.8-6.65l1.05-1.1Q17 9.1 17 8.9q0-.2-.15-.35l-1.4-1.4Q15.3 7 15.1 7q-.2 0-.35.15l-1.1 1.05ZM5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h4.2q.325-.9 1.088-1.45Q11.05 1 12 1t1.713.55Q14.475 2.1 14.8 3H19q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Zm0-2h14V5H5v14Zm7-14.75q.325 0 .538-.213q.212-.212.212-.537q0-.325-.212-.538q-.213-.212-.538-.212q-.325 0-.537.212q-.213.213-.213.538q0 .325.213.537q.212.213.537.213ZM5 19V5v14Z"></path></svg></span>NOTE</div><div class="admonition-content"><p>In other words, for each pixel at (location ${validate_component(KaTeX, "Math").$$render($$result, { text: "i" }, {}, {})}) I find the difference between the corresponding color channels of the compressed/quantized image ${validate_component(KaTeX, "Math").$$render($$result, { text: "C" }, {}, {})} and the original image ${validate_component(KaTeX, "Math").$$render($$result, { text: "O" }, {}, {})}. For example if the compressed color was [0,0,0] white and the original color was [255,255,255] black the summed error would be |255-0| + |255-0| + |255-0| or ${escape(255 * 3)} for that pixel. This would be an example of the maximum amount of error (pixel should have been black, but the compressed is white).</p><p>I store all these errors for all the pixels in an error matrix ${validate_component(KaTeX, "Math").$$render($$result, { text: "E" }, {}, {})} defined by ${validate_component(KaTeX, "Math").$$render(
        $$result,
        {
          text: "E_[i] = \\sum_[c=1]^[3] |C_[i, c] - O_[i,c]| \\tag1",
          big: true
        },
        {},
        {}
      )} where ${validate_component(KaTeX, "Math").$$render($$result, { text: "i" }, {}, {})} is the pixel index and ${validate_component(KaTeX, "Math").$$render($$result, { text: "c" }, {}, {})} is the color channel index.</p><p>This error image ${validate_component(KaTeX, "Math").$$render($$result, { text: "E" }, {}, {})} is what you see in red above. Then I simply average over these values to get the <strong data-svelte-h="svelte-po1o1d">Average Error</strong>.</p></div></div> <div id="Neural-Network-Weights" class="svp-anchor-item"></div> <h2 data-svelte-h="svelte-116opcm"><a href="#Neural-Network-Weights" class="svp-title-anchor" aria-label="Neural Network Weights"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path d="M280 341.1l-1.2.1c-3.6.4-7 2-9.6 4.5l-64.6 64.6c-13.7 13.7-32 21.2-51.5 21.2s-37.8-7.5-51.5-21.2c-13.7-13.7-21.2-32-21.2-51.5s7.5-37.8 21.2-51.5l68.6-68.6c3.5-3.5 7.3-6.6 11.4-9.3 4.6-3 9.6-5.6 14.8-7.5 4.8-1.8 9.9-3 15-3.7 3.4-.5 6.9-.7 10.2-.7 1.4 0 2.8.1 4.6.2 17.7 1.1 34.4 8.6 46.8 21 7.7 7.7 13.6 17.1 17.1 27.3 2.8 8 11.2 12.5 19.3 10.1.1 0 .2-.1.3-.1.1 0 .2 0 .2-.1 8.1-2.5 12.8-11 10.5-19.1-4.4-15.6-12.2-28.7-24.6-41-15.6-15.6-35.9-25.8-57.6-29.3-1.9-.3-3.8-.6-5.7-.8-3.7-.4-7.4-.6-11.1-.6-2.6 0-5.2.1-7.7.3-5.4.4-10.8 1.2-16.2 2.5-1.1.2-2.1.5-3.2.8-6.7 1.8-13.3 4.2-19.5 7.3-10.3 5.1-19.6 11.7-27.7 19.9l-68.6 68.6C58.9 304.4 48 330.8 48 359c0 28.2 10.9 54.6 30.7 74.4C98.5 453.1 124.9 464 153 464c28.2 0 54.6-10.9 74.4-30.7l65.3-65.3c10.4-10.5 2-28.3-12.7-26.9z" fill="currentColor"></path><path d="M433.3 78.7C413.5 58.9 387.1 48 359 48s-54.6 10.9-74.4 30.7l-63.7 63.7c-9.7 9.7-3.6 26.3 10.1 27.4 4.7.4 9.3-1.3 12.7-4.6l63.8-63.6c13.7-13.7 32-21.2 51.5-21.2s37.8 7.5 51.5 21.2c13.7 13.7 21.2 32 21.2 51.5s-7.5 37.8-21.2 51.5l-68.6 68.6c-3.5 3.5-7.3 6.6-11.4 9.3-4.6 3-9.6 5.6-14.8 7.5-4.8 1.8-9.9 3-15 3.7-3.4.5-6.9.7-10.2.7-1.4 0-2.9-.1-4.6-.2-17.7-1.1-34.4-8.6-46.8-21-7.3-7.3-12.8-16-16.4-25.5-2.9-7.7-11.1-11.9-19.1-9.8-8.9 2.3-14.1 11.7-11.3 20.5 4.5 14 12.1 25.9 23.7 37.5l.2.2c16.9 16.9 39.4 27.6 63.3 30.1 3.7.4 7.4.6 11.1.6 2.6 0 5.2-.1 7.8-.3 6.5-.5 13-1.6 19.3-3.2 6.7-1.8 13.3-4.2 19.5-7.3 10.3-5.1 19.6-11.7 27.7-19.9l68.6-68.6c19.8-19.8 30.7-46.2 30.7-74.4s-11.1-54.6-30.9-74.4z" fill="currentColor"></path></svg></a>Neural Network Weights</h2> <p data-svelte-h="svelte-1hiwy1j">So then, do you come up with an answer? What determines whether the quantization on neural network<sup><a href="#user-content-fn-2" id="user-content-fnref-2" data-footnote-ref aria-describedby="footnote-label">2</a></sup> weights is good or bad?</p> <p data-svelte-h="svelte-fxawmu">In my way of thinking, we must first see what a neural network is doing. Ultimately I really care about whether the output is good or not.</p> <p data-svelte-h="svelte-1mbld9w">So is it that easy, do we quantize the weights, then compute metrics for the model to see if its still usable?</p> <p data-svelte-h="svelte-tb731v">Well, yeah.</p> <p data-svelte-h="svelte-1cu3qre">But how can we get a deeper intuition other than with validation testing comparison with the original network?</p> <p data-svelte-h="svelte-ty99e8">First we must ask what then affects the output?</p> <p data-svelte-h="svelte-1bkzqlx">SO, what affects the output? Well, the previous neural network layer. And what makes up a layer in a regular neural network? A linear layer with a non-linearity. So what&#39;s in the linear layer? A weight matrix multiplied by the input with a bias added elementwise.</p> <p data-svelte-h="svelte-yq5d3s">This line of reasoning is nothing crazy. To put this in math notation, if I had a three layer neural network where the first two layers had ReLU activations and the last was just linear, I&#39;d have</p> ${validate_component(KaTeX, "Math").$$render(
        $$result,
        {
          text: "\\text[ReLU]\\left(\\text[ReLU]\\left(xW_1^T + b_1\\right)W_2^T + b_2\\right)W_3^T + b_3.\\tag[2]",
          big: true
        },
        {},
        {}
      )} <p data-svelte-h="svelte-1t0vn58">Although other operations will end up changing the numbers, the matrix multiplication must first be satisfied as something that doesn&#39;t totally spiral the error out of control.</p> <div class="admonition admonition-tip" data-svelte-h="svelte-lj85v6"><div class="admonition-heading"><span class="admonition-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M14.5 9.5C14.5 6.47 12.03 4 9 4S3.5 6.47 3.5 9.5c0 2.47 1.49 3.89 2.35 4.5h6.3c.86-.61 2.35-2.03 2.35-4.5z" opacity=".3"></path><path fill="currentColor" d="M7 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm-2-1h8v-2H5v2zm11.5-9.5c0 3.82-2.66 5.86-3.77 6.5H5.27c-1.11-.64-3.77-2.68-3.77-6.5C1.5 5.36 4.86 2 9 2s7.5 3.36 7.5 7.5zm-2 0C14.5 6.47 12.03 4 9 4S3.5 6.47 3.5 9.5c0 2.47 1.49 3.89 2.35 4.5h6.3c.86-.61 2.35-2.03 2.35-4.5zm6.87-2.13L20 8l1.37.63L22 10l.63-1.37L24 8l-1.37-.63L22 6l-.63 1.37zM19 6l.94-2.06L22 3l-2.06-.94L19 0l-.94 2.06L16 3l2.06.94L19 6z"></path></svg></span>think</div><div class="admonition-content"><p>How can I quantify error with respect to how the weight matrix is used? In other words, how can I quantify error with respect to the matrix multiplication? If I could assign a error number to a quantized weight matrix, I could then get an intuition for what types of weights/structure/patterns are fine and ones that lead to problems.</p></div></div> <div id="Size-of-error" class="svp-anchor-item"></div> <h2 data-svelte-h="svelte-ahlwp8"><a href="#Size-of-error" class="svp-title-anchor" aria-label="Size of error"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path d="M280 341.1l-1.2.1c-3.6.4-7 2-9.6 4.5l-64.6 64.6c-13.7 13.7-32 21.2-51.5 21.2s-37.8-7.5-51.5-21.2c-13.7-13.7-21.2-32-21.2-51.5s7.5-37.8 21.2-51.5l68.6-68.6c3.5-3.5 7.3-6.6 11.4-9.3 4.6-3 9.6-5.6 14.8-7.5 4.8-1.8 9.9-3 15-3.7 3.4-.5 6.9-.7 10.2-.7 1.4 0 2.8.1 4.6.2 17.7 1.1 34.4 8.6 46.8 21 7.7 7.7 13.6 17.1 17.1 27.3 2.8 8 11.2 12.5 19.3 10.1.1 0 .2-.1.3-.1.1 0 .2 0 .2-.1 8.1-2.5 12.8-11 10.5-19.1-4.4-15.6-12.2-28.7-24.6-41-15.6-15.6-35.9-25.8-57.6-29.3-1.9-.3-3.8-.6-5.7-.8-3.7-.4-7.4-.6-11.1-.6-2.6 0-5.2.1-7.7.3-5.4.4-10.8 1.2-16.2 2.5-1.1.2-2.1.5-3.2.8-6.7 1.8-13.3 4.2-19.5 7.3-10.3 5.1-19.6 11.7-27.7 19.9l-68.6 68.6C58.9 304.4 48 330.8 48 359c0 28.2 10.9 54.6 30.7 74.4C98.5 453.1 124.9 464 153 464c28.2 0 54.6-10.9 74.4-30.7l65.3-65.3c10.4-10.5 2-28.3-12.7-26.9z" fill="currentColor"></path><path d="M433.3 78.7C413.5 58.9 387.1 48 359 48s-54.6 10.9-74.4 30.7l-63.7 63.7c-9.7 9.7-3.6 26.3 10.1 27.4 4.7.4 9.3-1.3 12.7-4.6l63.8-63.6c13.7-13.7 32-21.2 51.5-21.2s37.8 7.5 51.5 21.2c13.7 13.7 21.2 32 21.2 51.5s-7.5 37.8-21.2 51.5l-68.6 68.6c-3.5 3.5-7.3 6.6-11.4 9.3-4.6 3-9.6 5.6-14.8 7.5-4.8 1.8-9.9 3-15 3.7-3.4.5-6.9.7-10.2.7-1.4 0-2.9-.1-4.6-.2-17.7-1.1-34.4-8.6-46.8-21-7.3-7.3-12.8-16-16.4-25.5-2.9-7.7-11.1-11.9-19.1-9.8-8.9 2.3-14.1 11.7-11.3 20.5 4.5 14 12.1 25.9 23.7 37.5l.2.2c16.9 16.9 39.4 27.6 63.3 30.1 3.7.4 7.4.6 11.1.6 2.6 0 5.2-.1 7.8-.3 6.5-.5 13-1.6 19.3-3.2 6.7-1.8 13.3-4.2 19.5-7.3 10.3-5.1 19.6-11.7 27.7-19.9l68.6-68.6c19.8-19.8 30.7-46.2 30.7-74.4s-11.1-54.6-30.9-74.4z" fill="currentColor"></path></svg></a>Size of error</h2> <p>Ultimately I want to determine the size of the error between a weight matrix ${validate_component(KaTeX, "Math").$$render($$result, { text: "W" }, {}, {})} and the compressed version ${validate_component(KaTeX, "Math").$$render($$result, { text: "C" }, {}, {})}. The naive way to do it is to apply the same error I did with the image example: the error between each corresponding element.</p> <p data-svelte-h="svelte-71cn6x">But it may be the case that matrix multiplication hides or enhances some of the error. So in a way, measuring the elementwise deviation would be deceitful.</p> <div class="admonition admonition-tip"><div class="admonition-heading" data-svelte-h="svelte-4rjqql"><span class="admonition-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M14.5 9.5C14.5 6.47 12.03 4 9 4S3.5 6.47 3.5 9.5c0 2.47 1.49 3.89 2.35 4.5h6.3c.86-.61 2.35-2.03 2.35-4.5z" opacity=".3"></path><path fill="currentColor" d="M7 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm-2-1h8v-2H5v2zm11.5-9.5c0 3.82-2.66 5.86-3.77 6.5H5.27c-1.11-.64-3.77-2.68-3.77-6.5C1.5 5.36 4.86 2 9 2s7.5 3.36 7.5 7.5zm-2 0C14.5 6.47 12.03 4 9 4S3.5 6.47 3.5 9.5c0 2.47 1.49 3.89 2.35 4.5h6.3c.86-.61 2.35-2.03 2.35-4.5zm6.87-2.13L20 8l1.37.63L22 10l.63-1.37L24 8l-1.37-.63L22 6l-.63 1.37zM19 6l.94-2.06L22 3l-2.06-.94L19 0l-.94 2.06L16 3l2.06.94L19 6z"></path></svg></span>think</div><div class="admonition-content"><p>So I ask, what is matrix-vector multiplication really doing ${validate_component(KaTeX, "Math").$$render($$result, { text: "Wx" }, {}, {})}?</p></div></div> <p data-svelte-h="svelte-v50q8l">Really what matrix-vector multiplication is a weighted combination of the columns of the matrix according to the input.</p> <p data-svelte-h="svelte-1oy0pec">So really the column structure of the matrix is what we&#39;re after, not simply an element-wise sum which takes into account no structure.</p> <p>One way to think about this is through how an input ${validate_component(KaTeX, "Math").$$render($$result, { text: "x" }, {}, {})} is transformed by the weight matrix ${validate_component(KaTeX, "Math").$$render($$result, { text: "W" }, {}, {})} under matrix multiplication and normalized as</p> <p>${validate_component(KaTeX, "Math").$$render(
        $$result,
        {
          text: "\\frac[||Wx||_1][||x||_1]\\tag[3]",
          big: true
        },
        {},
        {}
      )} where ${validate_component(KaTeX, "Math").$$render($$result, { text: "||\\cdot||_1" }, {}, {})} is the vector one-norm. You can directly interpret this as measuring how much the input has changed due to the matrix multiplication with the weight matrix.</p> <p>Then, in order to get a compact measure for the weight matrix, I can maximize ${validate_component(KaTeX, "Math").$$render($$result, { text: "x" }, {}, {})} which leaves me with the matrix operator norm induced by the one-norm: take the absolute sum over the columns and take the max column sum, that&#39;s the norm. Intuitively, this measures the vector ${validate_component(KaTeX, "Math").$$render($$result, { text: "x" }, {}, {})} that is most amplified by the matrix multiplication. You might consider if there are alternative measures.</p> <p data-svelte-h="svelte-11t5he8">Now with this matrix operator norm, I can have a measure for how big the matrix is given that it&#39;s going to be used for matrix multiplication.</p> <p>Then, I can simply do the same difference of error, but this time with the matrix operator norm
${validate_component(KaTeX, "Math").$$render(
        $$result,
        {
          text: "\\text[error] := \\frac[||W - C||][||W||]\\tag[4]",
          big: true
        },
        {},
        {}
      )} which can be interpreted as how much does the error deviation affect the matrix multiplication, then that is the error!</p> <p data-svelte-h="svelte-1pcvko9">You might think this has been one massive tangent, and it kind of has, but this is how we can determine whether its a good idea to apply quantization to a certain weight matrix or if we should keep trying other methods or move on.</p> <div id="Error-on-different-distributions" class="svp-anchor-item"></div> <h2 data-svelte-h="svelte-10ix218"><a href="#Error-on-different-distributions" class="svp-title-anchor" aria-label="Error on different distributions"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path d="M280 341.1l-1.2.1c-3.6.4-7 2-9.6 4.5l-64.6 64.6c-13.7 13.7-32 21.2-51.5 21.2s-37.8-7.5-51.5-21.2c-13.7-13.7-21.2-32-21.2-51.5s7.5-37.8 21.2-51.5l68.6-68.6c3.5-3.5 7.3-6.6 11.4-9.3 4.6-3 9.6-5.6 14.8-7.5 4.8-1.8 9.9-3 15-3.7 3.4-.5 6.9-.7 10.2-.7 1.4 0 2.8.1 4.6.2 17.7 1.1 34.4 8.6 46.8 21 7.7 7.7 13.6 17.1 17.1 27.3 2.8 8 11.2 12.5 19.3 10.1.1 0 .2-.1.3-.1.1 0 .2 0 .2-.1 8.1-2.5 12.8-11 10.5-19.1-4.4-15.6-12.2-28.7-24.6-41-15.6-15.6-35.9-25.8-57.6-29.3-1.9-.3-3.8-.6-5.7-.8-3.7-.4-7.4-.6-11.1-.6-2.6 0-5.2.1-7.7.3-5.4.4-10.8 1.2-16.2 2.5-1.1.2-2.1.5-3.2.8-6.7 1.8-13.3 4.2-19.5 7.3-10.3 5.1-19.6 11.7-27.7 19.9l-68.6 68.6C58.9 304.4 48 330.8 48 359c0 28.2 10.9 54.6 30.7 74.4C98.5 453.1 124.9 464 153 464c28.2 0 54.6-10.9 74.4-30.7l65.3-65.3c10.4-10.5 2-28.3-12.7-26.9z" fill="currentColor"></path><path d="M433.3 78.7C413.5 58.9 387.1 48 359 48s-54.6 10.9-74.4 30.7l-63.7 63.7c-9.7 9.7-3.6 26.3 10.1 27.4 4.7.4 9.3-1.3 12.7-4.6l63.8-63.6c13.7-13.7 32-21.2 51.5-21.2s37.8 7.5 51.5 21.2c13.7 13.7 21.2 32 21.2 51.5s-7.5 37.8-21.2 51.5l-68.6 68.6c-3.5 3.5-7.3 6.6-11.4 9.3-4.6 3-9.6 5.6-14.8 7.5-4.8 1.8-9.9 3-15 3.7-3.4.5-6.9.7-10.2.7-1.4 0-2.9-.1-4.6-.2-17.7-1.1-34.4-8.6-46.8-21-7.3-7.3-12.8-16-16.4-25.5-2.9-7.7-11.1-11.9-19.1-9.8-8.9 2.3-14.1 11.7-11.3 20.5 4.5 14 12.1 25.9 23.7 37.5l.2.2c16.9 16.9 39.4 27.6 63.3 30.1 3.7.4 7.4.6 11.1.6 2.6 0 5.2-.1 7.8-.3 6.5-.5 13-1.6 19.3-3.2 6.7-1.8 13.3-4.2 19.5-7.3 10.3-5.1 19.6-11.7 27.7-19.9l68.6-68.6c19.8-19.8 30.7-46.2 30.7-74.4s-11.1-54.6-30.9-74.4z" fill="currentColor"></path></svg></a>Error on different distributions</h2> <p data-svelte-h="svelte-131av5h">So what matrices compress well and what do not? Now that we have an error metric, we can try a ton of different weight distributions that one may encounter and see if any structure does well and does terribly.</p> ${validate_component(KMeansLive, "KMeansLive").$$render($$result, {}, {}, {})} <ul class="contains-task-list" data-svelte-h="svelte-amgnoo"><li class="task-list-item"><input type="checkbox" checked disabled> different distributions
<ul class="contains-task-list"><li class="task-list-item"><input type="checkbox" checked disabled> mostly zero except a few</li> <li class="task-list-item"><input type="checkbox" checked disabled> normal</li> <li class="task-list-item"><input type="checkbox" checked disabled> normal with outlier</li></ul></li> <li class="task-list-item"><input type="checkbox" checked disabled> Prettify the quantization error</li> <li class="task-list-item"><input type="checkbox" disabled> Write the stuff around the distributions of error</li> <li class="task-list-item"><input type="checkbox" disabled> Have a cool autoencoder example</li></ul> <section data-footnotes class="footnotes" data-svelte-h="svelte-1jeb537"><h2 class="sr-only" id="footnote-label">Footnotes</h2> <ol><li id="user-content-fn-1"><p>I&#39;m ignoring opacity alpha values. <a href="#user-content-fnref-1" data-footnote-backref class="data-footnote-backref" aria-label="Back to content">↩</a></p></li> <li id="user-content-fn-2"><p>I&#39;m assuming a vanilla neural network with nothing fancy. <a href="#user-content-fnref-2" data-footnote-backref class="data-footnote-backref" aria-label="Back to content">↩</a></p></li></ol></section>`;
    }
  })}`;
});
export {
  Page as default
};
