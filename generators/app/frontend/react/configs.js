import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { copyTemplate, renderTemplate, templatesDir } from "../configs.js";

export function writeConfigs(projectPath, pages, frameworkOptional = [], name) {
  renderTemplate("react", "package.json", projectPath, { name });
  const hasShadcn = frameworkOptional.includes("shadcn/ui");

  if (hasShadcn) {
    writeViteWithShadcn(projectPath);
  } else {
    copyTemplate("react", "vite.config.ts", projectPath);
  }

  copyTemplate("react", "index.html", projectPath);
  copyTemplate("react", "tsconfig.app.json", projectPath);
  copyTemplate("react", "tsconfig.node.json", projectPath);

  if (hasShadcn) {
    copyTemplate("react", "components.json", projectPath);
    copyTemplate("react", "src/app/index.css", projectPath);
    copyTemplate("react", "src/lib/utils.ts", projectPath);
  } else {
    writeFileSync(join(projectPath, "src", "app", "index.css"), '@import "tailwindcss";\n');
  }

  copyTemplate("react", "src/app/main.tsx", projectPath);
  copyTemplate("react", "src/app/App.tsx", projectPath);
  copyTemplate("react", "src/app/App.css", projectPath);
  generateRouter(projectPath, pages);
}

function writeViteWithShadcn(projectPath) {
  let content = readFileSync(join(templatesDir, "react", "vite.config.ts"), "utf-8");
  const anchor = 'return "vendor-react";\n\t\t\t\t\t}';
  const replacement = anchor + '\n\t\t\t\t\tif (id.includes("node_modules/@radix-ui")) return "vendor-ui";';
  content = content.replace(anchor, replacement);
  writeFileSync(join(projectPath, "vite.config.ts"), content);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateRouter(projectPath, pages) {
  let lazyImports;
  let routes;

  if (!pages.length) {
    lazyImports = 'const EmptyPage = () => <div>EmptyPage</div>;';
    routes = '\t\t\t\t\t<Route path="/" element={<EmptyPage />} />';
  } else {
    lazyImports = pages
      .map((p) => {
        const Name = capitalize(p);
        return `const ${Name}Page = lazy(() => import("@/pages/${Name}"));`;
      })
      .join("\n");
    routes = pages
      .map((p, i) => {
        const Name = capitalize(p);
        const path = i === 0 ? "/" : `/${p}`;
        return `\t\t\t\t\t<Route path="${path}" element={<${Name}Page />} />`;
      })
      .join("\n");
  }

  const content = `import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import { lazy, Suspense } from "react";

${lazyImports}

const LoadingFallback = () => <div className="p-4">Loading...</div>;

function Router() {
\treturn (
\t\t<BrowserRouter>
\t\t\t<Suspense fallback={<LoadingFallback />}>
\t\t\t\t<Routes>
\t\t\t\t\t<Route element={<App />}>
${routes}
\t\t\t\t\t</Route>
\t\t\t\t</Routes>
\t\t\t</Suspense>
\t\t</BrowserRouter>
\t);
}

export default Router;
`;
  writeFileSync(join(projectPath, "src", "app", "Router.tsx"), content);
}
