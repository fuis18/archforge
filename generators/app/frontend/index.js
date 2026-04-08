import { mkdirSync } from "node:fs";
import { createFolders, gitInit } from "../helpers.js";
import { installDeps } from "./deps.js";
import { writeBaseConfigs } from "./configs.js";
import { writeConfigs as writeReactConfigs } from "./react/configs.js";
import { createPages as createReactPages } from "./react/pages.js";
import { writeConfigs as writeSvelteConfigs } from "./svelte/configs.js";
import { createPages as createSveltePages } from "./svelte/pages.js";

const frameworkConfigs = {
  React: (cwd, pages, opt, name) => writeReactConfigs(cwd, pages, opt, name),
  Svelte: (cwd, pages, opt, name) => writeSvelteConfigs(cwd, name),
};

const frameworkPages = {
  React: (cwd, pages) => createReactPages(cwd, pages),
  Svelte: (cwd, pages) => createSveltePages(cwd, pages),
};

const frameworkFolders = {
  React: ["app", "components", "constants", "features", "pages", "context", "lib"],
  Svelte: ["lib/components", "lib/constants", "lib/features", "lib/pages"],
};

export async function setup(gen, name, answers) {
  const { framework } = answers;

  switch (framework) {
    case "React":
    case "Svelte":
      await setupViteBased(gen, name, answers);
      break;
    case "Astro":
      await setupAstro(gen, name, answers);
      break;
    default:
      gen.log(`"${framework}" aún no está implementado.`);
  }
}

async function setupViteBased(gen, name, answers) {
  const cwd = gen.destinationPath(name);
  const { framework, pages = [], frameworkOptionalDeps = [], generalOptionalDeps = [] } = answers;

  mkdirSync(cwd, { recursive: true });
  const folders = frameworkFolders[framework] || [];
  createFolders(gen, name, folders);

  writeBaseConfigs(cwd, name, framework);
  const fwConfigs = frameworkConfigs[framework];
  if (fwConfigs) fwConfigs(cwd, pages, frameworkOptionalDeps, name);

  const fwPages = frameworkPages[framework];
  if (fwPages) fwPages(cwd, pages);

  await gitInit(gen, name);
  await installDeps(gen, cwd, framework, frameworkOptionalDeps, generalOptionalDeps);
}

async function setupAstro(gen, name, answers) {
  await gen.spawn("bunx", ["create-astro@latest", name], { stdio: "inherit" });
  const cwd = gen.destinationPath(name);
  await gen.spawn("bunx", ["astro", "add", "tailwind"], { cwd, stdio: "inherit" });
  createFolders(gen, name, ["app", "components", "constants", "features", "pages"]);
}
