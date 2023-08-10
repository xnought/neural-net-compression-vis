---
title: Quantization
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

    /* .thumb {
        height: 100%;
        min-height: 300px;
        margin-right: 20px;
        background-size: cover;
        background-position: top left;
        transition-property: background;
        transition-duration: 1.5s;
        transition-timing-function: ease;
        transition-delay: 0s;
        border: 1px solid rgba(0, 0, 0, 0.25);
        border-radius: 2px;
    }
    .thumb:hover {
        background-position: top right;
    } */
</style>

Explaining Model Quantization from first principles with interactive visualizations.

## My Plan

-   [x] Explain the problem as fundamentally and simply as possible
-   [ ] K-means quantization
    -   [ ] intuitive example with image
    -   [ ] build up for how to pick the values
    -   [ ] take an autoencoder that reconstructs pixel art
    -   [ ] show errors for different amounts of quantization
    -   [ ] scale up to stable diffusion quantization
    -   [ ] connect to information theoretic standpoint

## Who cares?

Complex behavior requires complex computation. Today's most sophisticated neural networks are massive! They require layers upon layers of interconnected computation just to express certain outputs.

<img src="stable.png">

For example, take [Stable Diffusion](https://stability.ai/stablediffusion) (text to image generation). To encode such a vast array of creative, colorful, and beautiful behaviors (like those above), the model must be sufficiently complex. And indeed the model has hundreds of millions of parameters.

You likely can't run such models without expensive hardware. And even if you can run them, it might take a century for one generation.

I can't accept that. So let's leverage a stupid fact to make our situation better: smaller models run faster than bigger models.

By the end of this article, you will have understood one popular type of model compression and will be able to run stable diffusion in your browser.

## Images

Taking an already trained model and making it smaller while not corrupting the important information is THE task. But before we get to a model, how can we accomplish this on something more intuitive: image compression.

To make an image smaller, I might just change the width and height to something smaller. But, this type of manipulation has it's limitations. Among algorithmic considerations, I'd really like to keep the image the same size. I'd prefer not to squint.

Another idea is to remove information that doesn't take away from the meaning of the image. Essentially remove all the colors that can be removed and keep all the colors that absolutely must be there.

If I consider the image a collection of numbers (height, width, 3) tensor, the aim would be to consolidate the 3 channel colors into only the most important colors. Then, how does one find the most important colors?

### Finding Important Colors

I may consider the most important color the average of all the colors. Intuitively this would be the "center" of the data and may be a good choice. For example, let's take the following image and try to make it as small as we can.

<img src="dog.png" style="width: 200px">

By simply taking the average over all the colors in the image, I can get the most average color to represent the entire image.

As you can see, by just picking one color, it makes sense that it's this type of brown, but nonetheless to simplistic to see the image.

<KMeansImage selected={0}/>

How about the top two colors?

<KMeansImage selected={1}/>

If we continue to take the top average colors, we get something that rapidly looks like the original image with the fraction of colors, and thus less information.
Try sliding the slider on your own to quickly see these differences.

<KMeansImage selected={2}/>
