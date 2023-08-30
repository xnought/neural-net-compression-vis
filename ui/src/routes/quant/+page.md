---
title: Visualizing Model Compression Error
lastUpdate: August 2023
---

<script>
    import KMeansImage from "../../components/KMeansImage.svelte";
    import ImageError from "../../components/ImageError.svelte";
    import ImageErrorWithNumber from "../../components/ImageErrorWithNumber.svelte";
    import Math from "../../components/KaTeX.svelte";
    import KMeansLive from "../../components/KMeansLive.svelte";
    import Shared from "../../components/Shared.svelte";
    import AE from "../../components/AE.svelte";
    const repo = "https://github.com/xnought/docs";
</script>
<style>
    img {
        width: 100%;
        border-radius: 5px;
        box-shadow: 0px 0px 2px 2px #00000020;
    }
    .no-style {
        border-radius: none;
        box-shadow: none;
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

Often, the most incredible machine learning models also happen to be the largest. By making the model smaller, you and I can dream about running these models on our own machines. With model compression, we can reduce the size of the numbers in a model. This article runs through a simple way to quantize floating point numbers into smaller integers and the error we pay for it in matrix multiplies.

## Introduction

Modern deep learning is quite extraordinary. I don't need to convince you. You've likely seen the latest generative art models.

<div style="background-image: url(cyber.jpg);height: 50px;" class="thumb"/>

_From [Lexica](https://lexica.art/?q=cyberpunk+city)'s Aperture Model._

These models generate detailed, complex, and creative outputs. And yet, when you boil things down they are just transforming the inputs over and over again until a desirable output. It's not at all surprising that models like [Stable Diffusion XL](https://stability.ai/stablediffusion) have over 3 billion parameters that transform your inputs in a sophisticated way.

Size enables amazing capabilities, but also limits who can run them. Most people don't have fast GPUs with lots of memory. Instead, we must dive into the art of compressing neural network parameters while not totally ruining the learned structures of the model.

## Sharing as Compression

In this article I'll use the weight sharing scheme from [Deep Compression](https://arxiv.org/abs/1510.00149) to drastically reduce the size of my weights with little error (post-training). To give you an idea of why sharing a few floating point numbers would be helpful, here's the situation.

Suppose you owned 20 dogs. An army of golden retrievers. And also suppose you are on the market for dog toys.

Should you buy 20 toys for all 20 dogs? That would be quite expensive! If each toy was $20, then you'd pay $400. (as you can tell I love the number 20)

But you are a clever one you. You could reason that buying 5 toys would be totally fine. The dogs might get value out of sharing the toys, and furthermore not all 20 dogs would play with their toy at the same time. Now your bill would only be $100 for the 5 toys.

Morale of the short story: sharing under constraints is reasonable. More than that. It's a good idea. Don't pay for more than you need to if you're on a budget.

## Sharing Pixels

Images and neural network weights are both just collections of numbers in the form of a tensor. So let's first look at the more intuitive image use-case.

For image compression, the goal is to reduce the memory footprint while maintaining what the original image looked like.

As you know, images are made up of tons of small colored squares: pixels. I'll start with a 880 pixels wide by 602 pixels tall image of this cutest golden retriever you've ever seen.

<img src="dog.png" style="width: 300px;">

In total, there are 4,824,160 colors in the image (<Math text="880 \cdot 602"/>): one for each pixel. Each color is represented by three numbers: <span style="color: rgb(255, 0, 0)">red</span>, <span style="color: rgb(0, 255, 0)">green</span>, and <span style="color: rgb(0, 0, 255)">blue</span> that mix together to make that color. In total this one image is storing nearly 15 million numbers! That is quite a bit!

Instead of each pixel having a unique color, let's instead determine a few important colors and have all the other pixels share them. Exactly like the previous example with buying toys.

First, I'll take an average over all the pixels to get the most important color. Making all the pixels share that one pixel I get:

<KMeansImage selected={0}/>

It is significantly smaller in terms of memory, but looks nothing like the dog.

Now, let's share two colors instead of just one.

<KMeansImage selected={1}/>

Starting to look like a dog!

So what happens when we increase beyond two colors? Let's try!

:::important[Your turn]
Drag the slider to increase the number of colors to share.
:::

<KMeansImage selected={1} showSlider/>

After sharing just 256 colors, the images look remarkably similar. And we're only storing 256 colors!

:::note
I've left out some information on how to compute these multiple averages.

**For the purposes of this article, you can ignore how I compute the averages.**

However, if you must know I use the [k-means algorithm](https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html) on the image pixels to select out the top k average colors and assign each of the original pixels the closest pixel from the averages.

Check out [image.ipynb]({repo}/blob/main/notebooks/image.ipynb) to see how I used k-means on the images.
:::

Instead of storing three numbers per pixel, I store one that indexes into the shared important color pixels.

<Shared />

Above, the <span style="orange" >orange</span> window below shows a small portion of the pixels at eight color compression. Each pixel is just a number that indexes into the actual color. Hover over the image to move the window!

## Quantifying Error

So I think you get the point now. With can capture the top information from the data and only use that. This is of course is what quantization refers to.

This method is exactly the same for neural network weights. But how do we know if the neural network weights are correctly compressed? For the image example, you can visually tell, but for numbers in a tensor, this is not so easy.

Naturally, I'll make assumptions to make an error metric to tell us when the compressed data is close to the original.

For images, this is intuitive: take the difference between the pixels and see how wrong the compressed version is.

:::important[Your turn]
Drag the slider increase the number of colors quantized. Observe the pixels that are deep red for high error.
:::

<ImageErrorWithNumber />

As you can see, when the images look very similar, the red error is almost nonexistent. I can further summarize the error with an average into one number.

Now we have some conception of how good the compression was!

:::note
For each pixel at (location <Math text="i" />) I find the difference between the corresponding color channels of the compressed/quantized image <Math text="Q" /> and the original image <Math text="W" />. For example if the original color was black <Math text="(0,0,0)"/> and the quantized color was white <Math text="(255,255,255)"/>, the summed error would be <Math text="|255-0| + |255-0| + |255-0| = 765" /> for that one pixel.

I store each error term in this <Math text="E"/> matrix where each number is the error <Math text="E_[i] = \sum_[c=1]^[3] |W_[i, c] - Q_[i,c]| \tag{1}" big /> such that <Math text="i" /> is the pixel index and <Math text="c"/> is the color channel index.

This error image <Math text="E" /> is what you see in red above. Then I simply average over these error matrix values from <Math text="(1)" /> to get the **Average Error** as <Math text="\frac[1][N]\sum_[i=1]^[N] E_i"/>.

For the future, note that this form is very similar to the vector 1-norm of the difference between <Math text="W" /> and <Math text="Q" />.
:::

## Matrix Multiplication

For neural network weights, we aren't viewing them as images. So what makes their compression good or not?

Take this three layer neural network

<Math text="\text[ReLU]\left(\text[ReLU]\left(xW_1^T + b_1\right)W_2^T + b_2\right)W_3^T + b_3.\tag[2]" big/>

where <Math text="W_i" /> are weights and <Math text="b_i" /> are biases at layer <Math text="i"/>.

Almost all of the operations in the neural network that may effect the output (what we really care about) are matrix multiplies. So the output greatly depends on minimizing the compression error here.

Doing an element-wise difference would not capture what matrix multiplication is actually doing. What I mean to say is that error may be hidden or amplified by the matrix multiply operation. Something that we could not measure my doing element-wise differences like before.

:::warning
Things are about to get more mathematical. Not because they needs to be, but because it's easier for me to write about in a concise way. Be warned. (and maybe consider reviewing matrix and vector norms)
:::

With matrix multiplication we are doing a linear combination of the columns of the matrix defined by each number in the vector. Namely, <Math text="Wx = y" /> where <Math text="W" /> is the matrix, <Math text="x" /> is the column vector, and <Math text="y" /> is the output of the matrix multiply. Alternatively, think of <Math text="W" /> as transforming <Math text="x" /> into <Math text="y" />.

I can also define how the quantized matrix <Math text="Q" /> transforms the input <Math text="x" /> into some approximate output <Math text="\hat[y]" /> which won't quite be the same as the exact <Math text="y" />. I can then express the differences between the outputs <Math text="y" /> and <Math text="\hat[y]" /> in a single error term
<Math text="\text[error] &:= \frac[||y - \hat[y]||_1][||y||_1]\tag[3]" begin="align*" /> which is really just how big is the difference between the original output and compressed output after matrix multiplication, then normalized to be between 0 and 1.

:::note
I use the vector 1-norm here denoted by <Math text="||\cdot||" /> to give me the size of a vector.
:::

And since <Math text="Wx = y" /> and <Math text="Qx = \hat[y]" /> I can write the equation <Math text="(3)" /> only in terms of the inputs as

<Math text="
\frac[||y - \hat[y]||][||y||] = \frac[||Wx - Qx||][||Wx||]\tag[4]\\
" begin="align*" />

simply by how I defined things.

As is turns out, I can factor this error term into a term that only contains <Math text="W" /> and one other that contains both <Math text="Q" /> and <Math text="W" /> through the steps
<Math begin="align*" 
text="
\frac[||Wx - Qx||][||Wx||] &= \frac[||(W-Q)x||][||Wx||]\\
&= \frac[||(W-Q)W^[-1]y||][||Wx||]&&\text[since ] x = W^[-1]y\\
&\leq \frac[||W-Q|| \ ||W^[-1]|| \ ||y||][||Wx||]&&\text[since ] ||AB|| \leq ||A|| \ ||B||\\
&= \frac[||W-Q|| \ ||W^[-1]|| \ ||Wx||][||Wx||]&&\text[since ] ||Wx|| = ||y||\\
&= ||W-Q|| \ ||W^[-1]||\\
&= \frac[||W||][||W||] \ ||W-Q|| \ ||W^[-1]||\\
&= \left(||W|| \ ||W^[-1]||\right) \left(\frac[||W-Q||][||W||]\right). \tag[5]\\
" 
/>

and specifically where the norm applied to a matrix is the matrix operator norm induced by the 1-norm.

:::note
First of all, formulation was adapted from the lecture notes [CS 4220 Numerical Analysis](https://www.cs.cornell.edu/~bindel/class/cs4220-s15/lec/2015-02-04-notes.pdf).

Second, I use the matrix operator norm because the vector norm of a matrix doesn't capture the important information. The matrix operator norm tells me how the matrix transforms vectors under matrix multiplication which is exactly what I need.
:::

Applying the entire error term, we can visualize the error between the original weights and a compressed/quantized version.

The first term defined by only <Math text="W" /> as <Math text="||W|| \ ||W^[-1]||" /> is a very useful number in many applications for linear problems: the condition number. The second term looks quite similar to the image pixel error case as the difference between the matrices with a norm applied as <Math text="\frac[||W-Q||][||W||]" />.

Let's see what error looks like on some different weight matrices!

:::important[Your turn]
Select a distribution for the weights and how much you'd like to quantize the weights by dragging the slider. Observe the error terms and when the weights look similar.
:::

<KMeansLive />

First of all, not all matrices have the same condition number. The distribution with the outlier has a relatively large condition number which signals to me that the error will be amplified by that much.

Nonetheless, the error drops quickly the more weights we share, the more bits we use.

What's quite interesting is that despite the high condition number in the outlier case, the error drops much quicker than the other distributions as we increase the bits. I speculate that it's because k-means is sensitive (to a fault) to outliers. So it used an entire number in the shared weights for that one outlier weight. In general this is bad, but weirdly is good if you just want to minimize error and the underlying distribution isn't too crazy.

Alas! A quick way to visualize and quantify error for weights in neural networks! Even before quantizing your weights, you can quickly compute the condition number to see if you'll run into problems.

For linear quantization strategies, the condition number probably is vital. With k-means, we get away with masking it.

## More layers

Okay, but what about more than just one weight matrix.

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

As you can see, with a small number of bits, the output reconstruction is terrible. But as you pass some threshold it becomes quite good and doesn't improve by too much. Very importantly, the quantized models are four times smaller than the original.

Despite this neural network having a high maximum condition number (computed by taking the condition number over each layer and taking the max [ae_cond.ipynb](https://github.com/xnought/docs/blob/main/notebooks/ae_cond.ipynb)), using k-means quantization, the outputs look quite good: the reconstruction is accurate. I speculate again that with extra shared numbers to spare, k-means was sensitive tot he outlier which caused the high condition number, thereby masking the large effects.

## Conclusion

That's all folks! This journey was a bit scattered, but ultimately I did dive into what makes a good compression of weights with how I thought it should be. Perhaps others will figure out if conditioning is vital or not to truly have some predictive power whether quantization will succeed or not.

With all that being said, yes it's possible to drastically reduce the number of weights you use and yes non-linear techniques like k-means skirts amplification of error precisely for why people usually don't use is: sensitivity to outliers.

Until next time :smile:.

## Acknowledgments

-   I thank myself [Donny Bertucci](https://donnybertucci.com) for writing the article and [Adam Perer](https://perer.org/) for discussing ideas and giving me valuable feedback during the 2023 Summer at Carnegie Mellon University
-   Inspiration to even think to cover this topic from [here](https://www.youtube.com/watch?v=AlASZb93rrc) which evidently is by the author of that Deep Compression Paper I referenced earlier
-   [Observable Plot](https://observablehq.com/plot/) was extremely useful
-   [SveltePress](https://sveltepress.site/) is really awesome out of the box
-   [KaTeX](https://katex.org/) for math equations
