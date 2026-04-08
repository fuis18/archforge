import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const templatesDir = join(__dirname, "..", "templates", "frontend");

// --- Template helpers (shared by framework-specific configs) ---

export function copyTemplate(subdir, file, destPath) {
  const destFile = join(destPath, file);
  mkdirSync(dirname(destFile), { recursive: true });
  copyFileSync(join(templatesDir, subdir, file), destFile);
}

export function renderTemplate(subdir, file, destPath, vars) {
  let content = readFileSync(join(templatesDir, subdir, file), "utf-8");
  for (const [key, value] of Object.entries(vars ?? {})) {
    content = content.replaceAll(`{{${key}}}`, value);
  }
  const destFile = join(destPath, file);
  mkdirSync(dirname(destFile), { recursive: true });
  writeFileSync(destFile, content);
}

// --- General configs (shared across all frameworks) ---

function writeGeneralConfigs(projectPath, name) {
  copyTemplate("any", ".gitignore", projectPath);
  copyTemplate("any", ".npmrc", projectPath);
}

// --- Shared Vite configs (eslint, tsconfigs) ---

function writeViteConfigs(projectPath, framework) {
  copyTemplate(framework, "eslint.config.js", projectPath);
}

// --- Base configs (general + vite) ---

export function writeBaseConfigs(projectPath, name, framework) {
  writeGeneralConfigs(projectPath, name);
  writeViteConfigs(projectPath, framework);
}
