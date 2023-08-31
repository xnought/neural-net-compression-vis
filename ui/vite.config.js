import { defineConfig } from "vite";
import { sveltepress } from "@sveltepress/vite";
import { defaultTheme } from "@sveltepress/theme-default";

const config = defineConfig({
	plugins: [
		sveltepress({
			theme: defaultTheme({
				navbar: [
					// Add your navbar configs here
				],
				sidebar: {
					// Add your sidebar configs here
					quantization: [
						{
							title: "Articles",
							collapsible: true,
							items: [
								{
									title: "Visualizing Neural Network Compression",
									to: "quant",
								},
							],
						},
					],
				},
				github: "https://github.com/xnought/docs",
				logo: "logo.png",
			}),
			siteConfig: {
				title: " ",
				description: " ",
			},
		}),
	],
});

export default config;
