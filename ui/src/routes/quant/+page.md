---
title: Visualizing Quantization Error
lastUpdate: August 2023
---

<script>
    import KMeansImage from "../../components/KMeansImage.svelte";
    import ImageError from "../../components/ImageError.svelte";
    import ImageErrorWithNumber from "../../components/ImageErrorWithNumber.svelte";
    import Math from "../../components/KaTeX.svelte";
    import KMeansLive from "../../components/KMeansLive.svelte";
    import AE from "../../components/AE.svelte";
    const repo = "https://github.com/xnought/docs";
</script>
<style>
    img {
        width: 100%;
        border-radius: 5px;
        box-shadow: 0px 0px 2px 2px #00000020;
    }
    .caption {
        font-size: 12px;
        margin: 0;
        color: grey;
    }
    .center {
        display: flex;
        justify-content:center;
    }

    .thumb {
        height: 100%;
        min-height: 200px;
        margin-right: 20px;
        background-size: cover;
        background-position: top left;
        transition-property: background;
        transition-duration: 1.5s;
        transition-timing-function: ease;
        transition-delay: 0s;
        border-radius: 5px;
        box-shadow: 0px 0px 2px 2px #00000020;
    }
    .thumb:hover {
        background-position: bottom left;
    }
</style>

The coolest models on the market are just too big for your measly computer's memory. But actually, you can apply compression methods and run these models for yourself. This article motivates a simple method to compress your model (weight sharing quantization via k-means) while visualizing the error you incur.

## Introduction

Modern deep learning is quite extraordinary. I don't need to convince you. You've likely seen the latest generative art models.

<div style="background-image: url(cyber.jpg);height: 50px;" class="thumb"/>

_From [Lexica](https://lexica.art/?q=cyberpunk+city)'s Aperture Model._

These models generate detailed, complex, and creative outputs. And yet, when you boil things down they are just transforming the inputs over and over again until a desirable output. So it's not at all surprising that models like [Stable Diffusion XL](https://stability.ai/stablediffusion) have over 3 billion numbers (parameters) that transform your inputs in a sophisticated way.

Size enables amazing capabilities, but also limits who can run them. Most people don't have fast GPUs with lots of memory. Instead, we must dive into the art of compressing neural network parameters while not totally ruining the awesomeness of the model.

This article specifically uses the weight sharing scheme from [Deep Compression](https://arxiv.org/abs/1510.00149) to drastically reduce the size of my weights with little error (post-training).

## Sharing as Compression

Suppose you owned 20 dogs. An army of golden retrievers. And also suppose you are on the market for dog toys.

Should you buy 20 toys for all 20 dogs? That would be quite expensive! If each toy was $20, then you'd pay $400. (as you can tell I love the number 20)

But you are a clever one you. You could reason that buying 5 toys would be totally fine. The dogs might get value out of sharing the toys, and furthermore not all 20 dogs would play with their toy at the same time. Now your bill would only be $100 for the 5 toys.

Morale of the short story: sharing under constraints is reasonable. More than that. It's a good idea. Don't pay for more than you need to if you're on a budget.

## Sharing Pixels

Before we get to neural network weights, I'll take a quick detour through sharing pixels in an image to drastically reduce the size. It's too intuitive to pass up and is exactly what I'll do to the neural network parameters.

As you know, images are made up of tons of small colored squares: pixels. I'll start with a 880 pixels wide by 602 pixels tall image of this cutest golden retriever you've ever seen.

<img src="dog.png" style="width: 300px;">

In total, there are 4,824,160 colors in the image (<Math text="880 \cdot 602"/>) on for each pixel. Each color is represented by three numbers: <span style="color: rgb(255, 0, 0)">red</span>, <span style="color: rgb(0, 255, 0)">green</span>, and <span style="color: rgb(0, 0, 255)">blue</span> that mix together to make the color. In total this one image is storing nearly 15 million numbers! That is a lot!

To drastically reduce the memory, we will find the most important colors and share them.

One such way is through a summary of the data. For example through an average. Below, I've taken an average over all the pixels and assigned each pixel that average.

<KMeansImage selected={0}/>

The compressed version looks nothing like the original, but the color isn't totally off.

Now, what if I increased the number of averages I took to two? In other words, what if all the pixels had to share only two colors?

<KMeansImage selected={1}/>

Even just after two shared colors, there the compressed image is starting to look like the dog with a fraction of the memory footprint!

:::important[Your turn]
Drag the slider to increase the number of colors to share.
:::

<KMeansImage selected={1} showSlider/>

At 128 colors, the images start to look strikingly similar. And of course, compared to the original of ~5 million colors, we're representing this image at a massive budget!

To convert these savings to actual usable numbers, I can quickly compute each file size.

Remember, each pixel still needs to reference which of the 128 colors to use for the quantized version. So each pixel is represented as a one unsigned byte integer which then indexes into the array of 128 colors.

Since there are 4,824,160 pixels and each has one index into the 128 shared colors (each represented by RGB), the compressed image contains <Math text="128 \cdot 3 + 4[,]824[,]160 = 4[,]824[,]544" /> numbers.

Now the original was roughly 15 million numbers. That is roughly a three times space saving and I can barely tell the difference between the images.

:::note
I've left out some information on how to compute these multiple averages.

**For the purposes of this article, you can ignore how I compute the averages.**

However, if you must know I use the [k-means algorithm](https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html) on the image pixels to select out the top k average colors and assign each of the original pixels the closest pixel from the averages.

Check out the [Python Notebook]({repo}/blob/main/notebooks/image.ipynb) to see how I used k-means on the images.
:::

## Quantifying Error

At what point did you think that the quantized image looked close to the original? Answering for myself, it looked closer to the original as the number of shared colors increased.

But what does it really mean that it looked closer to the original? Do you see the issue here? If we rely on subjective experience that cannot be parsed, we've got a problem.

It's hard to parse the human brain, so let's make an assumption.

I could assume that the difference between the compressed colors and the original colors is large, the compressed image will not look like the original. So an error metric per each pixel.

:::important[Your turn]
Drag the slider increase the number of colors quantized. Observe the pixels that are deep red for high error.
:::

<ImageErrorWithNumber />

As you can see, when the images look very similar, the red error is almost nonexistent. I can further summarize the error with an average into one number (interpreted as the average difference between the compressed and original colors per pixel).

:::note
The math notation is not necessary, but may clarify whats going on.

For each pixel at (location <Math text="i" />) I find the difference between the corresponding color channels of the compressed/quantized image <Math text="Q" /> and the original image <Math text="W" />. For example if the compressed color was [0,0,0] white and the original color was [255,255,255] black the summed error would be |255-0| + |255-0| + |255-0| or {255\*3} for that pixel. This would be an example of the maximum amount of error (pixel should have been black, but the compressed is white).

I store all these errors for all the pixels in an error matrix <Math text="E"/> defined by <Math text="E_[i] = \sum_[c=1]^[3] |Q_[i, c] - W_[i,c]| \tag{1}" big /> where <Math text="i" /> is the pixel index and <Math text="c"/> is the color channel index.

This error image <Math text="E" /> is what you see in red above. Then I simply average over these error matrix values from <Math text="(1)" /> to get the **Average Error** as <Math text="\frac[1][N]\sum_[i=1]^[N] E_i"/>.
:::

## Sharing Weights in Matrix Multiplication

Now that we know how to share numbers and define how good a compression is, we can compress neural networks with greater confidence! I'll specifically focus on compressing weights involved in matrix multiplication and ignore how non-linearities might hide or extenuate errors.

To give you some reason why I focus on matrix multiplies, take this three neural layer network

<Math text="\text[ReLU]\left(\text[ReLU]\left(xW_1^T + b_1\right)W_2^T + b_2\right)W_3^T + b_3.\tag[2]" big/>

where <Math text="W_i" /> are weights and <Math text="b_i" /> are biases at layer <Math text="i"/>. Almost all of the operations in the neural network that may effect the output (what we really care about) are matrix multiplies. So the output greatly depends on minimizing the compression error here.

## Factorizing Error

Ultimately I want to determine the size of the error between a weight matrix <Math text="W" /> and the quantized version <Math text="Q" />. The naive way to do it is to apply the same error I did with the image example: the error between each corresponding element.

However, that wouldn't account for what the matrix multiplication does with the numbers. It could be that the matrix multiplication extenuates or hides some element-wise error.

So really what we want is the difference between how matrices transform an input vector <Math text="x" /> into an output <Math text="y" />. Or <Math text="Wx = y"/> is the operation with <Math text="y"/> being the output and <Math text="Qx = \hat[y]"/> as the quantized operation with <Math text="\hat[y]" /> as the new approximate output. The error is then the overall size of the difference between the exact output and approximate (<Math text="y - \hat[y]" />) and normalized by the exact (<Math text="y" />). I will represent the size of vectors as norms <Math text="||\cdot||" />. So the error can be written as

<Math text="\text[error] &:= \frac[||y - \hat[y]||][||y||]\tag[3]" begin="align*" /> which looks very similar to the image error example (which was the deviation between the original and compressed pixels).

If I represent the equation again with the matrix multiplication, I can do some simplification and rearranging as

<Math text="
\text[error] &:= \frac[||y - \hat[y]||][||y||]\\
&= \frac[||Wx - Qx||][||Wx||] &&\text[substitute]\\
&= \frac[||(W-Q)x||][||Wx||]\\
&= \frac[||(W-Q)W^[-1]y||][||Wx||]&&\text[since ] x = W^[-1]y\\
&\leq \frac[||W-Q|| \ ||W^[-1]|| \ ||y||][||Wx||]&&\text[since ] ||AB|| \leq ||A|| \ ||B||\\
&= \frac[||W-Q|| \ ||W^[-1]|| \ ||Wx||][||Wx||]&&\text[substitute]\\
&= ||W-Q|| \ ||W^[-1]||\\
&= \frac[||W||][||W||] \ ||W-Q|| \ ||W^[-1]||\\
&= \frac[||W-Q||][||W||] \ ||W|| \ ||W^[-1]||\tag[4]\\
" begin="align*" />

Which leaves us with this general term <Math text="\frac[||W-Q||][||W||]"/> times the condition number <Math text="||W||||W^[-1]||" /> in <Math text="(4)"/>. This formulation was adapted from the lecture notes [CS 4220 Numerical Analysis](https://www.cs.cornell.edu/~bindel/class/cs4220-s15/lec/2015-02-04-notes.pdf) and my recollections from [MTH 451 Numerical Linear Algebra](https://math.oregonstate.edu/directory/adel-faridani).

:::note
I will treat the norm on a matrix notated as <Math text="||\cdot||"/> as a [matrix operator norm](https://www.wikiwand.com/en/Matrix_norm) induced by the 1-norm.

Using a vector norm on a matrix doesn't capture it's usable structure. The matrix operator norm takes into account that the matrix will be used in matrix multiplication.

I'd simply interpret it as the size of the most stretched vector after being transformed by the matrix.
:::

Importantly in <Math text="(4)" /> there is a term that depends on the weight matrix and the compressed matrix <Math text="\frac[||W-Q||][||W||]"/> and another term that only depends on the weight matrix <Math text="||W||||W^[-1]||" />. So no matter how low I can get the first term, the second term, depending only to the original weight matrix, might still contribute to the error.

Applying the entire error term, we can visualize the error between the original weights and a compressed/quantized version.

:::important[Your turn]
Select a distribution for the original weights and how much you'd like to quantize the weights by dragging the slider.
:::

<KMeansLive />

As you can see as the more bits we quantize the weights for any of the distributions, the error drops.

What is really fascinating is that the distribution with the outlier drops drastically in error with just a few bits. However the condition number remains massive (just dependent on the original weights).

Why is that? Well it is still true if that one outlier is not encoder correctly, that the error will be quite large. But since k-means is quite sensitive to outliers, it quickly encoded a centroid just for the one outlier, rendering the condition number a red herring. Note that outlier are generally bad because ideally you'd like many weights to share, but at the price of catastrophic error, it is bearable.

Also note that as the quantized weights get closer to zero, the distribution of weights approaches the same shape and colors as the original weights. I challenge the reader to see if [KL-Divergence](https://www.wikiwand.com/en/Kullback%E2%80%93Leibler_divergence) would be a good metric here.

Overall, now we can figure out whether our real neural network weights can be quantized well or not beforehand and after quantization. Let's now apply quantization to a real neural network right in the browser!

## More layers

Instead of just one layer of weights, now I'll scale up to multiple layers with a real usable model.

I'll use a simple autoencoder architecture takes takes images of handwritten digits (0 through 9) and attempts to reconstruct the image after a bottleneck.

In [PyTorch](https://pytorch.org/docs/stable/index.html) I made a simple autoencoder with 5 layers with 2,148,832 total parameters.

```python
import torch
model = torch.nn.Sequential(
    torch.nn.Linear(28*28, 1000),
    torch.nn.ReLU(),
    torch.nn.Linear(1000, 256),
    torch.nn.ReLU(),
    torch.nn.Linear(256, 256),
    torch.nn.ReLU(),
    torch.nn.Linear(256, 1000),
    torch.nn.ReLU(),
    torch.nn.Linear(1000, 28*28),
    torch.nn.Sigmoid()
)
```

The training and definitions are in [mnist_autoencoder.ipynb](https://github.com/xnought/docs/blob/main/notebooks/mnist_autoencoder.ipynb) and the quantization is in [quantized_mnist_autoencoder.ipynb](https://github.com/xnought/docs/blob/main/notebooks/quantized_mnist_autoencoder.ipynb) if you're interested.

I quantized the model's weights and biases. The actual models have been loaded in javascript. Try it for yourself!

:::important[Your turn]
Draw on the left side blackboard a number and see how the model reconstructs your digit. Drag the slider to change the level of quantization.
:::

<AE />

As you can see, with a small number of bits, the output reconstruction is terrible. But as you pass some threshold it becomes quite good and doesn't improve by too much.

## Conclusion

Overall, you can represent your weights with less numbers than you previously thought through simple methods. Although you must be careful that the structure of your weights is not prone to extreme errors brought about through quantization!

One should not simply see if the weights are element-wise similar, taking into account what the weights are used for is as important when quantifying error after quantization.
