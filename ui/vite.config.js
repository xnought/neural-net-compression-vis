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
							collapsible: false,
							items: [
								{
									title: "Quantization",
									to: "/quant",
								},
							],
						},
					],
				},
				github: "https://github.com/xnought/quantization",
				logo: "/logo.png",
			}),
			siteConfig: {
				title: "_",
				description: "...",
			},
		}),
	],
});

export default config;
