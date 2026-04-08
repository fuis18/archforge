import { mkdirSync } from "node:fs";
import { join } from "node:path";

export function createFolders(gen, name, folders) {
  const srcPath = join(gen.destinationPath(name), "src");
  for (const folder of folders) {
    mkdirSync(join(srcPath, folder), { recursive: true });
  }
}

export async function gitInit(gen, name) {
  const cwd = gen.destinationPath(name);
  await gen.spawn("git", ["init"], { cwd, stdio: "inherit" });
}
