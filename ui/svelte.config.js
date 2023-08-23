import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/kit/vite";

/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
	extensions: [".svelte", ".md"],
	preprocess: [vitePreprocess()],
	kit: {
		adapter: adapter({
			pages: "dist",
			out: "public",
		}),
	},
};

export default config;
