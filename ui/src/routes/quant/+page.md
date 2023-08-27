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

_From [Lexica](https://lexica.art/)'s Aperture Model._

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

In total, there are 4,824,160 pixels in the image (<Math text="880 \cdot 602"/>). Each pixel/color is represented by three numbers: <span style="color: rgb(255, 0, 0)">red</span>, <span style="color: rgb(0, 255, 0)">green</span>, and <span style="color: rgb(0, 0, 255)">blue</span>. In total this one image is storing nearly 15 million numbers! That is a lot!

In this case, our constraint is the number of pixels. How can we boil down the pixels to just a few important colors and reuse them over again? (sharing)

One such way is through a summary of the data. One such summary is an average. Below, I've taken an average over all the pixels and assigned each pixel that average.

<KMeansImage selected={0}/>

Now, what if I want two colors? In other words, if all the pixels could only share the two colors, what would the image look like?

<KMeansImage selected={1}/>

That is starting to look like a dog!

:::important[your turn]
Drag the slider to increase the number of colors to share. When does the image start to look like the original?
:::

<KMeansImage selected={1} showSlider/>

128 colors looks mighty close to the original image!

To convert these savings to actual usable numbers, I can quickly compute each file size.

Remember, each pixel still needs to reference which of the 128 colors to use for the quantized version. So we still need to keep one byte per each pixel. Then when you need to access the pixel, you can use the number to index into the 128 colors.

So each shared color still has three number that represents the number and then one number per pixel to index into that codebook gives us <Math text="128 \cdot 3 \cdot 4824160=4824544" /> or 4,824,544 bytes.

Now the original was roughly 15 million numbers (and in this case bytes). That is a 3x space savings and the images look almost the same!

:::note
I've left out some information on how to compute these multiple averages.

**For the purposes of this article, you can ignore how I compute the averages.**

However, if you must know I use the [k-means algorithm](https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html) on the image pixels to select out the top k average colors and assign each pixel one of those k colors.
:::

## Humans are too good

At what point did you think that the quantized image looked close to the original? Answering for myself, it just looked closer to the original. What does that really mean?

Do you see the issue? If we plan to apply these quantization methods to neural network weights, how do we know when to stop or even if we should quantize at all?

First off, quantizing and compressing stuff depends on the usecase of whatever you're compressing. In the image case, it needed to look indistinguishable from the original to humans.

:::tip[think]
What is the usecase of weights in neural networks? How would quantization affect them?
:::

## Assigning a number to error

Before we get to the heart of the issue, I'll quickly show you what an error metric may look like for the image case.

I could assume that I as a human see the error when the colors diverge greatly from the original image.

So I could find the absolute difference between the compressed and original pixels. Then visualize places where the error is still high. Furthermore, I can compress the error values into one number with an average.

:::important[your turn]
Drag the slider increase the number of colors quantized. Observe the places with high error.  
:::

<ImageErrorWithNumber />

As the **Average Error** decreases (which is the average deviation from the original pixel color), we see the error image virtually disappears.

So as long as we attach a meaningful number to the error, we can decide when it's a good idea, and how to improve our methods to quantize/compress better.

But you must keep in mind the original usecase/application like we've done here with the image!

:::note
In other words, for each pixel at (location <Math text="i" />) I find the difference between the corresponding color channels of the compressed/quantized image <Math text="C" /> and the original image <Math text="O" />. For example if the compressed color was [0,0,0] white and the original color was [255,255,255] black the summed error would be |255-0| + |255-0| + |255-0| or {255\*3} for that pixel. This would be an example of the maximum amount of error (pixel should have been black, but the compressed is white).

I store all these errors for all the pixels in an error matrix <Math text="E"/> defined by <Math text="E_[i] = \sum_[c=1]^[3] |C_[i, c] - O_[i,c]| \tag{1}" big /> where <Math text="i" /> is the pixel index and <Math text="c"/> is the color channel index.

This error image <Math text="E" /> is what you see in red above. Then I simply average over these values to get the **Average Error**.
:::

## Neural Network Weights

So then, do you come up with an answer? What determines whether the quantization on neural network[^2] weights is good or bad?

[^2]: I'm assuming a vanilla neural network with nothing fancy.

In my way of thinking, we must first see what a neural network is doing. Ultimately I really care about whether the output is good or not.

So is it that easy, do we quantize the weights, then compute metrics for the model to see if its still usable?

Well, yeah.

But how can we get a deeper intuition other than with validation testing comparison with the original network?

First we must ask what then affects the output?

SO, what affects the output? Well, the previous neural network layer. And what makes up a layer in a regular neural network? A linear layer with a non-linearity. So what's in the linear layer? A weight matrix multiplied by the input with a bias added elementwise.

This line of reasoning is nothing crazy. To put this in math notation, if I had a three layer neural network where the first two layers had ReLU activations and the last was just linear, I'd have

<Math text="\text[ReLU]\left(\text[ReLU]\left(xW_1^T + b_1\right)W_2^T + b_2\right)W_3^T + b_3.\tag[2]" big/>

Although other operations will end up changing the numbers, the matrix multiplication must first be satisfied as something that doesn't totally spiral the error out of control.

:::tip[think]
How can I quantify error with respect to how the weight matrix is used? In other words, how can I quantify error with respect to the matrix multiplication? If I could assign a error number to a quantized weight matrix, I could then get an intuition for what types of weights/structure/patterns are fine and ones that lead to problems.
:::

## Size of error

Ultimately I want to determine the size of the error between a weight matrix <Math text="W" /> and the compressed version <Math text="C" />. The naive way to do it is to apply the same error I did with the image example: the error between each corresponding element.

But it may be the case that matrix multiplication hides or enhances some of the error. So in a way, measuring the elementwise deviation would be deceitful.

:::tip[think]
So I ask, what is matrix-vector multiplication really doing <Math text="Wx" />?
:::

Well, instead of thinking I could just do!

<Math text="
\text[error] &= \frac[||Wx - Qx||][||Wx||]\\
&= \frac[||Ex||][||Wx||]\\
&= \frac[||EW^[-1]y||][||Wx||]\\
&= \frac[||EW^[-1]y||][||y||]\\
&\leq \frac[||E||||W^[-1]||||y||][||y||]\\
&= \frac[||E||||W^[-1]||||y||][||y||]\\
&= ||E||||W^[-1]||\\
&= ||E||||W^[-1]||\frac[||W||][||W||]\\
&= ||W||||W^[-1]||\frac[||E||][||W||]\\
&= ||W||||W^[-1]||\frac[||W-Q||][||W||]
" begin="align*" />

Just condition number times.

<!--
Really what matrix-vector multiplication is a weighted combination of the columns of the matrix according to the input.

So really the column structure of the matrix is what we're after, not simply an element-wise sum which takes into account no structure.

One way to think about this is through how an input <Math text="x" /> is transformed by the weight matrix <Math text="W" /> under matrix multiplication and normalized as

<Math text="\frac[||Wx||_1][||x||_1]\tag[3]" big /> where <Math text="||\cdot||_1" /> is the vector one-norm. You can directly interpret this as measuring how much the input has changed due to the matrix multiplication with the weight matrix.

Then, in order to get a compact measure for the weight matrix, I can maximize <Math text="x" /> which leaves me with the matrix operator norm induced by the one-norm: take the absolute sum over the columns and take the max column sum, that's the norm. Intuitively, this measures the vector <Math text="x" /> that is most amplified by the matrix multiplication. You might consider if there are alternative measures.

Now with this matrix operator norm, I can have a measure for how big the matrix is given that it's going to be used for matrix multiplication.

Then, I can simply do the same difference of error, but this time with the matrix operator norm
<Math text="\text[error] := \frac[||W - C||][||W||]\tag[4]" big/> which can be interpreted as how much does the error deviation affect the matrix multiplication, then that is the error!

You might think this has been one massive tangent, and it kind of has, but this is how we can determine whether its a good idea to apply quantization to a certain weight matrix or if we should keep trying other methods or move on. -->

## Error on different distributions

So what matrices compress well and what do not? Now that we have an error metric, we can try a ton of different weight distributions that one may encounter and see if any structure does well and does terribly.

<KMeansLive />

## Applied to a real model

<AE />
