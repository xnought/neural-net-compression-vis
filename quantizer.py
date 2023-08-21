from sklearn.cluster import MiniBatchKMeans
import torch
import tqdm


class QuantizedParams(torch.nn.Module):
    def __init__(self, indexes, codebook):
        super().__init__()
        self.indexes = torch.nn.Parameter(indexes, requires_grad=False)
        self.codebook = torch.nn.Parameter(codebook, requires_grad=False)

    def forward(self):
        return self.codebook[self.indexes.to(torch.int32)]


class RegularParams(torch.nn.Module):
    def __init__(self, weights):
        super().__init__()
        self.weights = torch.nn.Parameter(weights, requires_grad=False)

    def forward(self):
        return self.weights


class HybridLinear(torch.nn.Module):
    def __init__(self, q_w, q_b):
        """each are callable modules that return the weights and biases"""
        super().__init__()
        self.weight = q_w
        self.bias = q_b

    def forward(self, X):
        return X @ self.weight().T + self.bias()


def k_means(X, k=2):
    kmeans = MiniBatchKMeans(n_clusters=k, random_state=0, n_init="auto").fit(X)
    return kmeans.cluster_centers_, kmeans.labels_


def quantize(weights, k=2, dtype=torch.float32):
    centroids, labels = k_means(weights.reshape(-1, 1), k)
    codebook = torch.tensor(centroids, dtype=dtype).reshape(-1)
    new_weights = torch.tensor(labels, dtype=torch.uint8).reshape(weights.shape)
    return codebook, new_weights


@torch.no_grad()
def quantize_linear_layer(layer, bits=8, dtype=torch.float32):
    weight = layer.weight
    bias = layer.bias

    num_weights = weight.view(-1, 1).shape[0]
    num_biases = 1 if bias is None else bias.view(-1, 1).shape[0]

    # apply k-means if there are enough parameters
    total_bits = int(2**bits)
    new_weight = None
    new_bias = None
    if num_weights > total_bits:
        w_codebook, w_indexes = quantize(weight, total_bits, dtype)
        new_weight = QuantizedParams(w_indexes, w_codebook)
    else:
        # no quantization :(
        new_weight = RegularParams(weight)

    if bias is not None and num_biases > total_bits:
        b_codebook, b_indexes = quantize(bias, total_bits, dtype)
        new_bias = QuantizedParams(b_indexes, b_codebook)
    else:
        # no quantization :(
        new_bias = RegularParams(
            bias if bias is not None else torch.tensor(0.0, dtype=dtype)
        )

    return HybridLinear(new_weight, new_bias)


def traverse_named_modules(m, filter="Linear"):
    for name, l in m.named_modules():
        if type(l).__name__ == filter:
            sep_name = name.split(".")
            parent = ".".join(sep_name[:-1])
            child = sep_name[-1]
            yield parent, child, l


def traverse_named_modules(m, filter="Linear"):
    for name, l in m.named_modules():
        if type(l).__name__ == filter:
            sep_name = name.split(".")
            parent = ".".join(sep_name[:-1])
            child = sep_name[-1]
            yield parent, child, l


def replace(model, filter, callback):
    modules = list(traverse_named_modules(model, filter))
    for p, c, l in tqdm.tqdm(modules, total=len(modules)):
        setattr(model.get_submodule(p), c, callback(p, c, l))


def replace_linear_with_quantized(model, bits=8, dtype=torch.float16):
    replace(
        model,
        "Linear",
        lambda p, c, l: quantize_linear_layer(l, bits=bits, dtype=dtype),
    )
