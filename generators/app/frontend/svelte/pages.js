import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function createRouteFile(srcPath, name, isIndex) {
  const Name = capitalize(name);
  const routePath = isIndex ? join(srcPath, "routes") : join(srcPath, "routes", name);
  mkdirSync(routePath, { recursive: true });

  const content = `<script lang="ts">
\timport ${Name}Page from '$lib/pages/${Name}Page.svelte';
</script>

<${Name}Page />
`;
  writeFileSync(join(routePath, "+page.svelte"), content);
}

function createPageFile(srcPath, name) {
  const Name = capitalize(name);
  const pagesPath = join(srcPath, "lib", "pages");
  mkdirSync(pagesPath, { recursive: true });

  const content = `<script lang="ts">
\timport ${Name} from '$lib/features/${name}/components/${Name}.svelte';
</script>

<${Name} />
`;
  writeFileSync(join(pagesPath, `${Name}Page.svelte`), content);
}

function createFeatureFiles(srcPath, name) {
  const Name = capitalize(name);
  const featurePath = join(srcPath, "lib", "features", name);

  mkdirSync(join(featurePath, "components"), { recursive: true });
  mkdirSync(join(featurePath, "types"), { recursive: true });

  const componentContent = `<div>${Name}Page</div>
`;
  writeFileSync(join(featurePath, "components", `${Name}.svelte`), componentContent);

  writeFileSync(join(featurePath, "types", `${name}.types.ts`), "");

  const indexContent = `export { default as ${Name} } from "./components/${Name}.svelte";
export * from "./types/${name}.types";
`;
  writeFileSync(join(featurePath, "index.ts"), indexContent);
}

export function createPages(projectPath, pages = []) {
  const srcPath = join(projectPath, "src");
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    createRouteFile(srcPath, page, i === 0);
    createPageFile(srcPath, page);
    createFeatureFiles(srcPath, page);
  }
}
