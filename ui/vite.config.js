import { defineConfig } from "vite";
import { sveltepress } from "@sveltepress/vite";
import { defaultTheme } from "@sveltepress/theme-default";

const config = defineConfig({
	plugins: [
		sveltepress({
			theme: defaultTheme({
				// themeColor: {
				// 	gradient: {
				// 		start: "blue",
				// 		end: "#2A80C1",
				// 	},
				// },
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
									title: "Quantization",
									to: "/articles/quant",
								},
							],
						},
					],
				},
				github: "https://github.com/xnought/quantization",
				logo: "/logo.png",
			}),
			siteConfig: {
				title: "Entropic",
				description: "...",
			},
		}),
	],
});

export default config;
