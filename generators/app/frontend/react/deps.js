export const deps = ["react", "react-dom", "react-router"];

export const devDeps = [
  "vite",
  "typescript",
  "@eslint/js",
  "@types/react",
  "@types/react-dom",
  "@vitejs/plugin-react",
  "eslint",
  "eslint-plugin-react-hooks",
  "eslint-plugin-react-refresh",
  "typescript-eslint",
  "globals",
];

export const optionalDeps = {
  "shadcn/ui": {
    deps: [
      "shadcn",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
      "lucide-react",
      "tw-animate-css",
      "@radix-ui/react-slot",
    ],
    devDeps: [],
  },
};
