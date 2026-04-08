const optionalDepsMap = {
  "SQL": {
    jsDeps: ["@tauri-apps/plugin-sql"],
    devDeps: [],
    cargoDeps: [
      {
        name: "tauri-plugin-sql",
        features: ["sqlite"],
      },
    ],
  },
};

async function installCargoDeps(gen, srcTauriPath, deps) {
  for (const dep of deps) {
    const args = ["add", dep.name];
    if (dep.features?.length) {
      args.push("--features", dep.features.join(","));
    }
    await gen.spawn("cargo", args, { cwd: srcTauriPath, stdio: "inherit" });
  }
}

export async function installDeps(gen, cwd, appwebOptional = []) {
  await gen.spawn("bun", ["add", "-D", "@tauri-apps/cli@latest", "-E"], {
    cwd,
    stdio: "inherit",
  });
  await gen.spawn("bun", ["add", "@tauri-apps/api", "-E"], {
    cwd,
    stdio: "inherit",
  });

  for (const choice of appwebOptional) {
    const opt = optionalDepsMap[choice];
    if (!opt) continue;

    if (opt.jsDeps?.length) {
      await gen.spawn("bun", ["add", ...opt.jsDeps, "-E"], { cwd, stdio: "inherit" });
    }

    if (opt.devDeps?.length) {
      await gen.spawn("bun", ["add", "-D", ...opt.devDeps, "-E"], { cwd, stdio: "inherit" });
    }
  }
}

export async function installCargoOptionalDeps(gen, srcTauriPath, appwebOptional = []) {
  for (const choice of appwebOptional) {
    const opt = optionalDepsMap[choice];
    if (!opt?.cargoDeps?.length) continue;
    await installCargoDeps(gen, srcTauriPath, opt.cargoDeps);
  }
}
