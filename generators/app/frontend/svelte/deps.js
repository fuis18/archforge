export function getDeps(isAppWeb) {
  return {
    deps: [],
    devDeps: [
      "vite",
      "typescript",
      "@sveltejs/vite-plugin-svelte",
      "svelte",
      "svelte-check",
      isAppWeb ? "@sveltejs/adapter-static" : "@sveltejs/adapter-auto",
      "@sveltejs/kit",
      "@eslint/js",
      "eslint",
      "eslint-plugin-svelte",
      "@eslint/compat",
      "typescript-eslint",
      "globals",
    ],
    optionalDeps: {},
  };
}
