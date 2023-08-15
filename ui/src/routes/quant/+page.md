---
title: On Model Quantization Error
lastUpdate: August 2023
---

<script>
    import KMeansImage from "../../components/KMeansImage.svelte";
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

Visualizing how error can crop up in a type of sharing quantization. Specifically analyzing the condition number after quantization of weight tensors.

<!-- ## My Plan

-   [x] Explain the problem as fundamentally and simply as possible
-   [ ] Explain how we can save a ton of space by sharing colors/weights
-   [ ] Have a cool webcam example of live k-means weight sharing
-   [ ] Yes massive space savings, but how does the affect key operations? Is there something to be said about the matrix itself?
-   [ ] Deriving condition number specifically after k-means quantization and putting a number to the error
-   [ ] Specifically honing in on attention mechanism for quantization -->

## Too Big

Modern neural networks are really freaking cool. For example, with [Stable Diffusion](https://stability.ai/stablediffusion), you can generate your own [anime waifu](https://github.com/harubaru/waifu-diffusion). Enough said, clearly you are already convinced.

<div style="background-image: url(taller.png);height: 50px;" class="thumb"/>

_From [Lexica](https://lexica.art/?q=34e00886-6b4f-47fe-a9b9-9f4e630bbb28)'s Aperture Model._

Joking aside, the detail and creativity is beautiful with no exaggeration. But there is also a beauty to the thing itself. The neural networks that generate such art have hundreds of millions or even billions of tunable knobs that are interconnected in such a way to create something meaningful.

The awesomeness of so many parameters unfortunately has its downsides. Namely, you need expensive computers to run these large models. There are so many parameters that the model may not even fit in your computer's memory[^1]. And even if it can fit, you might wait your entire lifetime just to do one generation. Too damn slow!

[^1]: For example the new cool models of today like [Llama2](https://huggingface.co/docs/transformers/main/model_doc/llama2) needs > 100 GB ram just to fit.

So, to actually run these models on your hardware, smart people have developed [quantization](https://pytorch.org/docs/stable/quantization.html) techniques to make the models smaller. The main point: reduce the number of floating point numbers[^2] you store and use.

[^2]: Formats to store decimal numbers. Aka, not integers. 32 or 16 bit floating point. See [here](https://www.wikiwand.com/en/Floating-point_arithmetic) for more info.

Can we use an extremely simple techniques to reduce the model size drastically? Furthermore, how can we compress without killing the magic. Let's try!

## Sharing is caring

Why would we buy 20 toys for 20 dogs when we could just buy 5? Not all the toys are in use all the time. Furthermore, their may be fun in sharing the toy with a dograde (comrade, but dog). Instead of buying 20 toys at 20 dollars each, 400 dollars total, I'll just buy 5 for 100 dollars total! A 4x savings!

Now, there may be downsides of 5 toys. Certain dogs may rip toys up to shreds, or some dogs may be left behind with no toys. Darn the alphas! Instead of saving you may spiral into madness. This is not fair in our dog democracy.

This tradeoff can be easily seen in a simple example of trying to make images smaller. Let's see.

For example, I'll start with a 880 pixels wide by 602 pixels tall image of this cutest golden retriever you've ever seen.

<img src="dog.png" style="width: 300px;">

For this image, there are 880 times 602 pixels which totals to 4,864,160 pixels. There are three colors that represent each pixel: red, green, and blue. So in total there are 4,864,160 \* 3 = 14,592,480 numbers we store for that image. Each color is represented by a number from 0 to 255 or just one unsigned 8 bit integer: one byte. So this image has 14,592,480 bytes, or ~14 mega bytes.

That's a lot of bytes!

:::tip[think]
How much data can we remove so that the image still looks like a dog?  
:::

One powerful intuition is using averages as the sharing mechanism.

You may ask yourself: what is the average color of the image? Perhaps that would leave us with the most important single color. Instead of 4,864,160 colors, I would then just store 1 color. Its like if all the pixels are sharing one color.

<KMeansImage selected={0}/>

You will not be surprised to know that one color isn't useful. We've lost the dog! It looks nothing like the original! But, the averaged color isn't completely out of left field. It seems to have captured the average of the dogs color, table, and background.

What if we increase the number of average colors to compute? How about we now store two averages? Would that look more like the image?

<KMeansImage selected={1}/>

That is starting to look like a dog! Let's continue to see how close we get to the original!

:::important[interaction]
Keep on increasing the number of average colors to compute by dragging the slider below.
:::

<KMeansImage selected={2} showSlider/>

Instead of 4,864,160 colors for the original image, we only store 128 colors now.

Each pixel still needs to reference which of the 128 colors to use. So we still need to keep one byte per each pixel. Then when you need to access the pixel, you can use the number to index into the 128 colors.

To tally the space savings now, for the compressed image we store one number per pixel plus the 128 average colors which totals to 128\*3 + 4,864,160 = 4,864,544 bytes.

Compared to the original of 14,592,480 bytes that is ~3 times smaller!

:::note
I've left out some information on how to compute these multiple averages.

**For the purposes of this article, you can ignore how I compute the averages.**

However, if you must know I use the [k-means algorithm](https://k-means-explorable.vercel.app/) on the image pixels to select out the top k average colors and assign each pixel one of those k colors.

For example, for the top k=4 colors, I run the k-means algorithm which locates 4 "centroids" which are rough centers in the color data: 4 averages. Then, I can go through each pixel and see which average (centroid) is closest to that color and assign it that average color.

So each pixel can be represented by a single byte 0, 1, 2, or 3 which then references one of the average colors we computed.

We are sharing colors!
:::

## Err on the side of Error

It is not a crazy leap to use the image example as an analog to the weights in a neural network. Instead of color sharing, we can do weight sharing! Representing the floating point numbers as small integers that index into the top averages. It would massively compress these models! Potentially a 4x savings (from f32 to u8).

But there is a compressed elephant in the room.

First, the weights are being multiplied with input numbers, then being multiplied by more weights, and so forth. Surely the error from one layer of weights would amplify, right? The model was trained on the real numbers, not the shared averages!

Now it's easy to see from the dog image that 128 colors represented the original image surprisingly well. But, if you had something you couldn't look at, how would you define how good/close the compression is to the original?

Together, we can come up with some error measurement so that we can see if a neural network would take well or be destroyed by quantization without looking at the results.

-   [ ] Inspiration from the image example (show pixelwise error)
-   [ ] Matrix operator norm the error
-   [ ] Applying the error to a model
-   [ ] Using the error metric to do further training
-   [ ] Applying the results to a real model
-   [ ] Be done with it!

<!-- Furthermore, can we algorithmically say when an image  -->
