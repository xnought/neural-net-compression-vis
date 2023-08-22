---
title: On Compressing Weights
lastUpdate: August 2023
---

<script>
    import KMeansImage from "../../components/KMeansImage.svelte";
    import ImageError from "../../components/ImageError.svelte";
    import ImageErrorWithNumber from "../../components/ImageErrorWithNumber.svelte";
    import Math from "../../components/KaTeX.svelte";
    import KMeansLive from "../../components/KMeansLive.svelte";
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
        transition-property: background, box-shadow;
        transition-duration: 1.5s;
        transition-timing-function: ease;
        transition-delay: 0s;
        border-radius: 5px;
        box-shadow: 0px -1px 2px 2px #00000020;
    }
    .thumb:hover {
        background-position: bottom left;
        box-shadow: 0px 1px 2px 2px #00000020;
    }
</style>

How does compressing your neural network weights change the outputs? This article attempts to build up a good way to think about model compression and the fundamental operations that are affected. From as close to first principles logic as possible.

## Big indeed

Modern deep learning is quite extraordinary. I don't need to convince you, you've probably seen the latest generative art models and other incredible models that blow your socks off.

<div style="background-image: url(taller.png);height: 50px;" class="thumb"/>

_From [Lexica](https://lexica.art/?q=34e00886-6b4f-47fe-a9b9-9f4e630bbb28)'s Aperture Model._

The funny thing is that these networks are just transforming the inputs over and over again until a desirable output. To create really complex outputs (like generative art), you thus need a reasonable amount of transformations. So it's not at all surprising that models like [Stable Diffusion XL](https://stability.ai/stablediffusion) have over 3 billion weights!

Likely the average consumer (you and me) can't run these models on our computers alone. They just won't fit in RAM, and even if they do, it might take a century to produce one generation.

Luckily, there are strategies to cope with the size. Namely, model quantization: the act of converting floating point weights into small integers. With quantization you can reasonably reduce the model size by 4x or more.

If the outputs of the model aren't changed too much, the compression is a total win! Now more people can run these incredible models!

## Sharing

Suppose you owned 20 dogs. An army of golden retrievers. And also suppose you are on the market for dog toys.

Should you buy 20 toys for all 20 dogs? That would be quite expensive! If we clock each toy at 20$, then you'd pay 400$.

Or you could reason that buying 5 toys would be fine. Not all 20 dogs are playing with their toy at once. They could share! Now your bill would only be 100$.

The basic principle is that sharing may be good enough under constraints.

## Sharing Image Pixels

How can sharing be applied to reduce image size? Images are represented pretty closely to neural networks, so this is a tangent, but in a way it's not. Pay attention these intuitions will be helpful!

As you know, images are made up of tons of small colored squares: pixels. I'll start with a 880 pixels wide by 602 pixels tall image of this cutest golden retriever you've ever seen.

<img src="dog.png" style="width: 300px;">

If I had enough time, I could count how many pixels there are and find there are almost five million! Or if I just remembered how to multiply, I'd multiply the width times the height to get the total number as <Math text="808 \cdot 602 = 4,824,160"/> pixels, which is just under five million pixels. Ah whatever, I'm in a rounding mood.

Remember, each pixel is one color. And each color is represented by three numbers: <span style="color: rgb(255, 0, 0)">red</span>, <span style="color: rgb(0, 255, 0)">green</span>, and <span style="color: rgb(0, 0, 255)">blue</span>. So if there are around five million pixels and each pixel has three numbers, than in total there are about 15 million numbers in that image[^1].

[^1]: I'm ignoring opacity alpha values.

:::tip[think]
How can we apply sharing to the pixels?
:::

In order to share the pixels, we need to constrain them into a few important ones. Getting one color is easy. We can just take the average over all the pixels to get the most important color. Then, I can assign each pixel one number that indexes into my shared colors. In this case there is only one.

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

-   [ ] Matrix operator norm
-   [ ] Error computation
-   [ ] Error on different distributions of weights
-   [ ] Compress autoencoder trained via pytorch

<!-- ## \_

Okay, now that we can see the general strategy to quantify error works and aligns with how we saw differences in the images, we can apply it to an unintuitive scenario. Something we can't easily look at and tell if the compression is good or not: neural network weights.

:::tip[think]
What mechanisms inside a neural network would be affected if we changed the trained weights slightly?
:::

Let's break this apart together. For the vast majority of use cases, we have some prediction we want to make. This could be image classification or even probabilities over possible text tokens to finish a sentence.

So if the output is changed, clearly we have a problem. What what changes the output?

Well obviously the previous neural network layer. And what affects that neural network layer? Well, the layers before that!

Okay, so then let's go to the initial layer that transforms the inputs.

So what inside the layer is affected by our quantization of the weights?

Although there are more intuitive explanation of what a neural network is doing, one easy way to represent the change is a linear transformation of the input space, followed by a non-linear function.

We store these values in a weight matrix <Math text="W" /> and multiply it by the input vector <Math text="x" /> or <Math text="Wx" /> and typically apply some non-linear activation function like <Math text="\text[ReLU]\left(Wx\right)" />.

So then what affects the non-linear output? Well, now we're simply left with the inside <Math text="Wx\tag[2]." big />

Okay, well now we've quantized and compressed <Math text="W" /> into something different which I'll call <Math text="Q" /> for quantized.

One potential way to quantify error would be to do the same method we did with the images. So compute the difference between <Math text="W" /> and <Math text="Q" />, then average it all up. However, that would ignore the meaning of what we're doing. We're transforming the input <Math text="x" /> into some output using matrix multiplication. So we want to take into account how multiplies and adds amplify our error.

:::note
It is also important to know how that error is then amplified again when it is input into the next layer of the neural network, but I'll ignore that complexity for now.

Let's stick with how the linear transformation of the input is changed for now.
:::

So I can use the 1-norm induced operator norm on the difference between <Math text="W" /> and <Math text="Q" /> to see how the error is affected under matrix multiplication. In other words, I'm trying to measure how the error is accentuated by matrix multiplication as <Math text="\frac[||W-Q||][||W||]\tag[3]" big /> which is almost the same as <Math text="(1)" /> as the error between the image and the compressed.

The larger the matrix multiplication exaggerates the pixel wise error, the worse off we are.

-   [ ] Have a rotation example in notebook
-   [ ] Mockup visuals
-   [ ] Have larger example with python tutorial using my code
-   [ ] Resnet with tvm?
-   [ ] If time permits add stable diffusion

<KMeansLive /> -->
