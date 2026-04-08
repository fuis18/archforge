import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function createPageFile(srcPath, name) {
  const Name = capitalize(name);
  const content = `import { ${Name}Page } from "@/features/${name}";

const ${Name} = () => <${Name}Page />;

export default ${Name};
`;
  writeFileSync(join(srcPath, "pages", `${Name}.tsx`), content);
}

function createFeatureFiles(srcPath, name) {
  const Name = capitalize(name);
  const featurePath = join(srcPath, "features", name);

  mkdirSync(join(featurePath, "components"), { recursive: true });
  mkdirSync(join(featurePath, "hooks"), { recursive: true });
  mkdirSync(join(featurePath, "types"), { recursive: true });

  const componentContent = `const ${Name}Page = () => {
\treturn <div>${Name}Page</div>;
};

export default ${Name}Page;
`;
  writeFileSync(join(featurePath, "components", `${Name}Page.tsx`), componentContent);

  writeFileSync(join(featurePath, "types", `${name}.types.ts`), "");

  const indexContent = `export { default as ${Name}Page } from "./components/${Name}Page";
export * from "./types/${name}.types";
`;
  writeFileSync(join(featurePath, "index.ts"), indexContent);
}

export function createPages(projectPath, pages = []) {
  const srcPath = join(projectPath, "src");
  for (const page of pages) {
    createPageFile(srcPath, page);
    createFeatureFiles(srcPath, page);
  }
}
