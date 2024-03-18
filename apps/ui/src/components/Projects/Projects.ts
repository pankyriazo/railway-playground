import api from "@/api";
import { Projects as ProjectsType } from "@monorepo/types";
import { StatefulComponent } from "@/types";
import store from "@/store";
import Project from "@/components/Project";

import styles from "./Projects.module.css";

class Projects extends StatefulComponent<HTMLDivElement> {
  private _token: string = "";
  private _projects: NonNullable<
    ProjectsType["data"]
  >["me"]["projects"]["edges"] = [];
  private _errorMessage: string = "";

  constructor() {
    super();

    this._element = document.createElement("div");
    this._element.id = "projects";

    this._subscribe();

    this.render();
  }

  private _subscribe() {
    return store.subscribe((state) => {
      if (state.token !== this._token) {
        this._token = state.token;
        this._fetchProjects();
      }

      if (
        state.projects.errors &&
        state.projects.errors[0] &&
        state.projects.errors[0].message !== this._errorMessage
      ) {
        this._errorMessage = state.projects.errors[0].message;
        this.setState("error");
      }

      if (
        state.projects.data &&
        state.projects.data.me.projects.edges !== this._projects
      ) {
        this._projects = state.projects.data.me.projects.edges;
        this.setState("loaded");
        this.render();
      }
    });
  }

  private _fetchProjects() {
    this.setState("loading");

    api
      .getProjectList({
        token: store.state.token,
      })
      .then((response) => {
        store.dispatch({
          type: "SET_PROJECTS",
          payload: response,
        });
      })
      .catch((e) => {
        this._errorMessage = e.message;
        this.setState("error");
      });
  }

  override render() {
    if (!this._element) {
      return;
    }

    this._element.innerHTML = "";
    this._element.dataset.testid = "projects";

    const title = document.createElement("h2");
    title.dataset.testid = "projects__title";
    title.className = styles.title!;
    title.textContent = "Projects";

    switch (this._state) {
      case "loading":
        this._element.appendChild(title);

        const skeletonContainer = document.createElement("div");
        skeletonContainer.dataset.testid = "projects__skeleton";
        skeletonContainer.className = styles.skeletonContainer!;

        for (let i = 0; i < 3; i++) {
          const skeleton = document.createElement("div");
          skeleton.className = styles.skeleton!;
          skeletonContainer.appendChild(skeleton);
        }

        this._element.appendChild(skeletonContainer);
        break;
      case "loaded":
        this._element.appendChild(title);

        const projectList = document.createElement("ul");
        projectList.dataset.testid = "projects__list";
        projectList.className = styles.projectList!;

        for (const projectData of this._projects) {
          const project = new Project(projectData.node);
          projectList.appendChild(project.element);
        }

        this._element.appendChild(projectList);
        break;
      case "error":
        this._element.appendChild(title);

        const errorTitle = document.createElement("h3");
        errorTitle.dataset.testid = "projects__error-title";
        errorTitle.textContent = "Error fetching projects";
        errorTitle.className = styles.errorTitle!;
        this._element.appendChild(errorTitle);

        const errorMessage = document.createElement("p");
        errorMessage.dataset.testid = "projects__error-message";
        errorMessage.textContent = this._errorMessage;
        errorMessage.className = styles.errorMessage!;
        this._element.appendChild(errorMessage);
        break;
    }
  }
}

export default Projects;
