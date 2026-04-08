import { copyTemplate, renderTemplate } from "../configs.js";

export function writeConfigs(projectPath, name) {
  renderTemplate("svelte", "package.json", projectPath, { name });
  copyTemplate("svelte", "vite.config.ts", projectPath);
  copyTemplate("svelte", "svelte.config.js", projectPath);
  copyTemplate("svelte", "tsconfig.json", projectPath);
  copyTemplate("svelte", "eslint.config.js", projectPath);
  
  copyTemplate("svelte", "src/app.d.ts", projectPath);
  copyTemplate("svelte", "src/app.html", projectPath);
  copyTemplate("svelte", "src/routes/+layout.svelte", projectPath);
  copyTemplate("svelte", "src/routes/+page.svelte", projectPath);
  copyTemplate("svelte", "src/routes/layout.css", projectPath);
  copyTemplate("svelte", "src/lib/assets/favicon.svg", projectPath);
}
