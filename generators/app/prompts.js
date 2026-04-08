export const mainPrompts = [
  {
    type: "input",
    name: "name",
    message: "Nombre del proyecto:",
    validate: (input) => (input.trim() ? true : "El nombre es requerido"),
  },
  {
    type: "select",
    name: "projectType",
    message: "Tipo de proyecto:",
    choices: ["Frontend", "Backend"],
  },
];

export const frontendPrompts = [
  {
    type: "select",
    name: "framework",
    message: "Framework:",
    choices: ["Astro", "Qwik", "Svelte", "React", "NextJS", "TanStack Start"],
  },
];

// --- Optional deps per framework ---

const frameworkOptionalChoices = {
  React: ["shadcn/ui"],
};

export function getFrameworkOptionalPrompt(framework) {
  const choices = frameworkOptionalChoices[framework];
  if (!choices?.length) return null;
  return {
    type: "checkbox",
    name: "frameworkOptionalDeps",
    message: `Dependencias opcionales de ${framework}:`,
    choices,
    validate: () => true,
  };
}

// --- General optional deps ---

export const generalOptionalPrompt = {
  type: "checkbox",
  name: "generalOptionalDeps",
  message: "Dependencias opcionales generales:",
  choices: ["zustand", "TanStack Table"],
  validate: () => true,
};

// --- AppWeb optional deps ---

export const appwebOptionalPrompt = {
  type: "checkbox",
  name: "appwebOptionalDeps",
  message: "Dependencias opcionales de App Web (Tauri):",
  choices: ["SQL"],
  validate: () => true,
};

export const pagesPrompt = {
  type: "input",
  name: "pageCount",
  message: "¿Cuántas páginas necesitará el proyecto?",
  validate: (input) => {
    const n = Number(input);
    return Number.isInteger(n) && n >= 0 ? true : "Ingresa un número entero válido (0 o más)";
  },
};

export const pageNamePrompt = (index) => ({
  type: "input",
  name: "pageName",
  message: `Nombre de la página ${index + 1}:`,
  validate: (input) => (input.trim() ? true : "El nombre es requerido"),
});

export const appwebPrompt = {
  type: "confirm",
  name: "appweb",
  message: "¿Desea configurarlo como App Web (Tauri)?",
  default: false,
};


export const backendPrompts = [
  {
    type: "select",
    name: "stack",
    message: "Stack:",
    choices: ["Nest + Prisma + Fastify", "Actix-web"],
  },
];
