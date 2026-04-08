import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { installDeps } from "./deps.js";

export async function setup(gen, name, answers) {
  const cwd = gen.destinationPath(name);
  const { appwebOptionalDeps = [] } = answers;

  await installDeps(gen, cwd, appwebOptionalDeps);
  await gen.spawn("bun", ["tauri", "init"], { cwd, stdio: "inherit" });

  if (appwebOptionalDeps.includes("SQL")) {
    mkdirSync(join(cwd, "src-tauri", "src", "migrations"), { recursive: true });
  }
}
