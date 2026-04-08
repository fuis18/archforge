import { defineConfig } from "vite";
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		host: true,
		port: 5173,
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks(id: string) {
					if (id.includes("node_modules/svelte")) {
						return "vendor-svelte";
					}
				},
			},
		},
	},
});
