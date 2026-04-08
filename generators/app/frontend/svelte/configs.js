import { copyTemplate, renderTemplate } from "../configs.js";

export function writeConfigs(projectPath, name, answers) {
  renderTemplate("svelte", "package.json", projectPath, { name });
  copyTemplate("svelte", "vite.config.ts", projectPath);
  renderTemplate("svelte", "svelte.config.js", projectPath, {
    adapter: answers.appweb ? "static" : "auto",
    adapterOptions: answers.appweb ? "{ fallback: 'index.html' }" : "",
  });
  copyTemplate("svelte", "tsconfig.json", projectPath);
  copyTemplate("svelte", "eslint.config.js", projectPath);
  
  copyTemplate("svelte", "src/app.d.ts", projectPath);
  copyTemplate("svelte", "src/app.html", projectPath);
  copyTemplate("svelte", "src/routes/+layout.svelte", projectPath);
  copyTemplate("svelte", "src/routes/+page.svelte", projectPath);
  copyTemplate("svelte", "src/routes/layout.css", projectPath);
  copyTemplate("svelte", "src/lib/assets/favicon.svg", projectPath);
}
