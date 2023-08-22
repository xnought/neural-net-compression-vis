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

## Err on the side of Error

It is not a crazy leap to use the image example as an analog to the weights in a neural network. Instead of color sharing, we can do weight sharing! Representing the floating point numbers as small integers that index into the top averages. It would massively compress these models! Potentially a 4x savings (from f32 to u8).

But there is a compressed elephant in the room.

How does the error between the compressed and original values affect the outputs? For images atleast its easy to see that the images looks similar, and therefore the compression at a certain level is tolerable.

### Images

But for other applications it's not so easy to tell whether some values are good or not.

So it may be helpful to quantify the error into a number. Visually this can be seen as the distance between the compressed value and the true original value.

For an image, we can clearly visualize the pixel-wise error in red. Basically, where the compressed image is different from the original.

:::important[interaction]
Drag the slider to increase the number of average colors. Specifically look at the places with deep red to see the most error.
:::

<ImageError />

As the compressed image gets better, the error becomes almost invisible!

In other words, for each pixel at (location <Math text="i" />) I find the difference between the color channels of the compressed <Math text="\hat[A]" /> and the original <Math text="A" />. For example if the compressed color was [0,0,0] white and the original color was [255,255,255] black the summed error would be |255-0| + |255-0| + |255-0| or {255\*3} for that pixel. This would be an example of the maximum amount of error (pixel should have been black, but the compressed is white).

:::note
I store all these errors for all the pixels in an error matrix <Math text="E"/> defined by <Math text="D_[i] = \sum_[c=1]^[3] |A_[i, c] - \hat[A]_[i,c]| \tag{1}" big /> (exactly what I just said before)
which is displayed above as the error in red.

The closer the sum is to completely wrong the closer it is 255\*3 which is the gap between white and black.

Then, I can very easily compress the pixel error <Math text="D" /> in <Math text="(1)" /> into an average error <Math text="\frac[1][N]\sum_[i=1]^[N] D_[i]" /> where <Math text="N" /> is the total number of pixels.

:::

:::important[interaction]
Drag the slider to increase the number of average colors. Specifically look at **Average Error** label.
:::
<ImageErrorWithNumber />

Notice, how the average error between pixel colors drops drastically as the compressed image gets better!

### Weights

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

<KMeansLive />
