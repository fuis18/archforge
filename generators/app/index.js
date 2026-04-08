import Generator from "yeoman-generator";
import {
  mainPrompts,
  frontendPrompts,
  backendPrompts,
  pagesPrompt,
  pageNamePrompt,
  getFrameworkOptionalPrompt,
  generalOptionalPrompt,
  appwebPrompt,
  appwebOptionalPrompt,
} from "./prompts.js";
import * as frontend from "./frontend/index.js";
import * as appweb from "./frontend/appweb/index.js";
import * as backend from "./backend.js";

export default class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument("name", {
      type: String,
      required: false,
      description: "Nombre del proyecto",
    });
  }

  async prompting() {
    const prompts = this.options.name
      ? mainPrompts.filter((p) => p.name !== "name")
      : mainPrompts;
    this.answers = await this.prompt(prompts);
    if (this.options.name) this.answers.name = this.options.name;

    if (this.answers.projectType === "Frontend") {
      const fwAnswers = await this.prompt(frontendPrompts);
      Object.assign(this.answers, fwAnswers);

      const { pageCount } = await this.prompt([pagesPrompt]);
      const pages = [];
      for (let i = 0; i < Number(pageCount); i++) {
        const { pageName } = await this.prompt([pageNamePrompt(i)]);
        pages.push(pageName.trim().toLowerCase());
      }
      this.answers.pages = pages;

      const fwOptionalPrompt = getFrameworkOptionalPrompt(this.answers.framework);
      if (fwOptionalPrompt) {
        const { frameworkOptionalDeps } = await this.prompt([fwOptionalPrompt]);
        this.answers.frameworkOptionalDeps = frameworkOptionalDeps || [];
      } else {
        this.answers.frameworkOptionalDeps = [];
      }

      const { generalOptionalDeps } = await this.prompt([generalOptionalPrompt]);
      this.answers.generalOptionalDeps = generalOptionalDeps || [];

      const { appweb } = await this.prompt([appwebPrompt]);
      this.answers.appweb = appweb;
    }

    if (this.answers.projectType === "Backend") {
      const answers = await this.prompt(backendPrompts);
      Object.assign(this.answers, answers);
    }
  }

  async install() {
    const { name, projectType } = this.answers;

    if (projectType === "Frontend") {
      await frontend.setup(this, name, this.answers);

      if (this.answers.appweb) {
        const { appwebOptionalDeps } = await this.prompt([appwebOptionalPrompt]);
        this.answers.appwebOptionalDeps = appwebOptionalDeps || [];
        await appweb.setup(this, name, this.answers);
      }
    }

    if (projectType === "Backend") {
      await backend.setup(this, name, this.answers);
    }
  }

  end() {
    this.log(`\nProyecto "${this.answers.name}" creado exitosamente.`);
  }
}
