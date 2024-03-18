import { Node, Project as ProjectType } from "@monorepo/types";
import { Component } from "@/types";
import Services from "@/components/Services";
import EnvironmentSelect from "@/components/EnvironmentSelect";

import styles from "./Project.module.css";

class Project extends Component<HTMLLIElement> {
  private _project: ProjectType;
  private _environment: Node | null = null;

  constructor(project: ProjectType) {
    super();

    this._element = document.createElement("li");
    this._element.id = `project-${project.id}`;
    this._project = project;
    this._environment = project.environments.edges[0]?.node ?? null;

    this.render();
  }

  private _onEnvironmentChange(environment: Node) {
    this._environment = environment;
    this.render();
  }

  override render() {
    if (!this._element) {
      return;
    }

    this._element.innerHTML = "";
    this._element.dataset.testid = "project";
    this._element.className = styles.container!;

    const title = document.createElement("h3");
    title.dataset.testid = "project__title";
    title.className = styles.title!;
    title.textContent = this._project.name;
    this._element.appendChild(title);

    if (!this._environment) {
      return;
    }

    const environmentInstance = new EnvironmentSelect({
      options: this._project.environments,
      selected: this._environment,
      onChange: this._onEnvironmentChange.bind(this),
    });
    const environment = document.createElement("div");
    environment.className = styles.environment!;
    environment.appendChild(environmentInstance.element);
    this._element.appendChild(environment);

    const servicesInstance = new Services({
      project: this._project,
      services: this._project.services,
      environment: this._environment,
    });
    const services = document.createElement("div");
    services.className = styles.services!;
    services.appendChild(servicesInstance.element);
    this._element.appendChild(services);
  }
}

export default Project;
