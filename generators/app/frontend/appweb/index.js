import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { installCargoOptionalDeps, installDeps } from "./deps.js";

export async function setup(gen, name, answers) {
  const cwd = gen.destinationPath(name);
  const { appwebOptionalDeps = [] } = answers;

  await installDeps(gen, cwd, appwebOptionalDeps);
  await gen.spawn("bun", ["tauri", "init"], { cwd, stdio: "inherit" });

  const srcTauriPath = join(cwd, "src-tauri");
  if (!existsSync(srcTauriPath)) {
    throw new Error(`No se encontró el directorio ${srcTauriPath} después de tauri init`);
  }

  await installCargoOptionalDeps(gen, srcTauriPath, appwebOptionalDeps);

  if (appwebOptionalDeps.includes("SQL")) {
    mkdirSync(join(srcTauriPath, "src", "migrations"), { recursive: true });
  }
}
