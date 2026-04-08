import * as reactDeps from "./react/deps.js";
import { getDeps as getSvelteDeps } from "./svelte/deps.js";

// --- General frontend deps (shared across all Vite-based frameworks) ---
const generalDeps = [];
const generalDevDeps = ["tailwindcss", "@tailwindcss/vite", "@types/node"];

// --- Framework deps registry ---
const frameworkDeps = {
  React: reactDeps,
};

const getFrameworkDeps = (framework, isAppWeb) => {
  if (framework === 'Svelte') {
    return getSvelteDeps(isAppWeb);
  }
  return frameworkDeps[framework];
};

// --- General optional deps (keyed by choice name) ---
const generalOptionalDepsMap = {
  "zustand": { deps: ["zustand"], devDeps: [] },
  "TanStack Table": { deps: ["@tanstack/react-table"], devDeps: [] },
};

async function installPkgs(gen, cwd, deps, devDeps) {
  if (deps.length) {
    await gen.spawn("bun", ["add", ...deps, "-E"], { cwd, stdio: "inherit" });
  }
  if (devDeps.length) {
    await gen.spawn("bun", ["add", "-D", ...devDeps, "-E"], { cwd, stdio: "inherit" });
  }
}

export async function installDeps(gen, cwd, framework, answers) {
  const frameworkOptional = answers.frameworkOptionalDeps || [];
  const generalOptional = answers.generalOptionalDeps || [];
  const isAppWeb = answers.appweb || false;

  await installPkgs(gen, cwd, generalDeps, generalDevDeps);

  const fw = getFrameworkDeps(framework, isAppWeb);
  if (!fw) return;

  await installPkgs(gen, cwd, fw.deps, fw.devDeps);

  // Optional framework deps
  const fwOptMap = fw.optionalDeps || {};
  for (const choice of frameworkOptional) {
    const opt = fwOptMap[choice];
    if (!opt) continue;
    await installPkgs(gen, cwd, opt.deps, opt.devDeps);
  }

  // General optional deps
  for (const choice of generalOptional) {
    const opt = generalOptionalDepsMap[choice];
    if (!opt) continue;
    await installPkgs(gen, cwd, opt.deps, opt.devDeps);
  }
}
