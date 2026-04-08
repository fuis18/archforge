const optionalDepsMap = {
  "SQL": {
    deps: ["@tauri-apps/plugin-sql"],
    devDeps: [],
  },
};

export async function installDeps(gen, cwd, appwebOptional = []) {
  await gen.spawn("bun", ["add", "@tauri-apps/api", "-E"], {
    cwd,
    stdio: "inherit",
  });
  await gen.spawn("bun", ["add", "-D", "@tauri-apps/cli@latest", "-E"], {
    cwd,
    stdio: "inherit",
  });

  for (const choice of appwebOptional) {
    const opt = optionalDepsMap[choice];
    if (!opt) continue;
    if (opt.deps.length) {
      await gen.spawn("bun", ["add", ...opt.deps, "-E"], { cwd, stdio: "inherit" });
    }
    if (opt.devDeps.length) {
      await gen.spawn("bun", ["add", "-D", ...opt.devDeps, "-E"], { cwd, stdio: "inherit" });
    }
  }
}
