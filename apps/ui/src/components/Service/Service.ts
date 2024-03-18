import { Deployments as DeploymentsType, Node } from "@monorepo/types";
import api from "@/api";
import { StatefulComponent } from "@/types";
import store from "@/store";
import Deployments from "@/components/Deployments";

import styles from "./Service.module.css";

const pendingFetchRequests = new Map<string, boolean>();

class Service extends StatefulComponent<HTMLLIElement> {
  private _token: string = "";
  private _project: Node;
  private _service: Node;
  private _environment: Node;
  private _deployments: NonNullable<DeploymentsType["data"]>["deployments"] = {
    edges: [],
  };

  constructor({
    project,
    service,
    environment,
  }: {
    project: Node;
    service: Node;
    environment: Node;
  }) {
    super();

    this._element = document.createElement("li");
    this._element.id = `service-${service.id}`;
    this._project = project;
    this._service = service;
    this._environment = environment;

    this._subscribe();

    this.render();
  }

  private _subscribe() {
    if (pendingFetchRequests.get(this._service.id)) {
      this._state = "loading";
    }

    return store.subscribe((state) => {
      if (this._service.id in state.deployments) {
        this._deployments = state.deployments[this._service.id]!;
        this.setState("loaded");

        return;
      }

      if (state.token !== this._token) {
        this._token = state.token;
        store.dispatch({
          type: "REMOVE_DEPLOYMENT",
          payload: this._service.id,
        });

        if (
          this._state !== "loading" &&
          !pendingFetchRequests.get(this._service.id)
        ) {
          this._fetchDeployments();
        }
      }
    });
  }

  private _fetchDeployments() {
    pendingFetchRequests.set(this._service.id, true);
    this.setState("loading");

    api
      .getDeploymentList({
        token: this._token,
        projectId: this._project.id,
        serviceId: this._service.id,
      })
      .then((response) => {
        pendingFetchRequests.delete(this._service.id);

        if (response.errors) {
          this.setState("error");
          return;
        }

        store.dispatch({
          type: "ADD_DEPLOYMENT",
          payload: {
            [this._service.id]: response.data.deployments,
          },
        });
      })
      .catch(() => {
        this.setState("error");
      });
  }

  override render() {
    if (!this._element) {
      return;
    }

    this._element.innerHTML = "";
    this._element.dataset.testid = "service";

    const title = document.createElement("h4");
    title.dataset.testid = "service__title";
    title.className = styles.title!;
    title.textContent = this._service.name;

    switch (this._state) {
      case "loading":
        const skeleton = document.createElement("div");
        skeleton.dataset.testid = "service__skeleton";
        skeleton.className = styles.skeleton!;
        this._element.appendChild(skeleton);
        break;
      case "loaded":
        if (!this._deployments) {
          throw new Error("Deployments not found");
        }

        this._element.appendChild(title);

        const deploymentListForEnvironment = this._deployments.edges.filter(
          ({ node: deployment }) =>
            deployment.environmentId === this._environment.id
        );

        const deploymentsInstance = new Deployments({
          deployments: { edges: deploymentListForEnvironment },
        });
        const deployments = document.createElement("div");
        deployments.className = styles.deployments!;
        deployments.appendChild(deploymentsInstance.element);
        this._element.appendChild(deployments);
        break;
      case "error":
        this._element.appendChild(title);

        const error = document.createElement("h5");
        error.dataset.testid = "service__error-title";
        error.textContent = "Error fetching deployments";
        this._element.appendChild(error);
        break;
    }
  }
}

export default Service;
