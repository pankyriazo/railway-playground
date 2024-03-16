import { Edges, Project as ProjectType } from "@monorepo/types";
import Project from "@/components/Project";

class Projects {
  private _element: HTMLUListElement;
  private _projects: Edges<ProjectType>;

  constructor(projects: Edges<ProjectType>) {
    this._element = document.createElement("ul");
    this._element.id = "projects";
    this._projects = projects;
  }

  private _build() {
    this._projects.edges.forEach(({ node: projectData }) => {
      const project = new Project(projectData);
      this._element.appendChild(project.element);
    });
  }

  public get projects() {
    return this._projects;
  }

  public get element() {
    this._build();
    return this._element;
  }
}

export default Projects;
