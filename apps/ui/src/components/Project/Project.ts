import { Project as ProjectType } from "@monorepo/types";
import Services from "@/components/Services";

class Project {
  private _element: HTMLLIElement;
  private _project: ProjectType;

  constructor(project: ProjectType) {
    this._element = document.createElement("li");
    this._element.id = `project-${project.id}`;
    this._project = project;
  }

  private _build() {
    this._element.innerHTML = `<h2>${this._project.name}</h2>`;

    const services = new Services(this._project.services);

    this._element.appendChild(services.element);
  }

  public get project() {
    return this._project;
  }

  public get element() {
    this._build();
    return this._element;
  }
}

export default Project;
