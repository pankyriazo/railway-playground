import { Deployments as DeploymentsType } from "@monorepo/types";
import { Component } from "@/types";
import Deployment from "@/components/Deployment";

import styles from "./Deployments.module.css";

class Deployments extends Component<HTMLUListElement> {
  private _deployments: NonNullable<DeploymentsType["data"]>["deployments"];

  constructor({
    deployments,
  }: {
    deployments: NonNullable<DeploymentsType["data"]>["deployments"];
  }) {
    super();

    this._element = document.createElement("ul");
    this._element.id = "deployments";
    this._deployments = deployments;

    this.render();
  }

  override render() {
    if (!this._element) {
      return;
    }

    this._element.innerHTML = "";
    this._element.dataset.testid = "deployments";
    this._element.className = styles.list!;

    if (this._deployments.edges.length === 0) {
      const empty = document.createElement("p");
      empty.dataset.testid = "deployments__empty";
      empty.className = styles.empty!;
      empty.textContent = "No deployments found.";
      this._element.appendChild(empty);
      return;
    }

    for (const { node: deploymentData } of this._deployments.edges) {
      const deployment = new Deployment({
        deployment: deploymentData,
      });
      this._element.appendChild(deployment.element);
    }
  }
}

export default Deployments;
