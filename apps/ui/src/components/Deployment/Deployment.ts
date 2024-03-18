import { Deployment as DeploymentType } from "@monorepo/types";
import { StatefulComponent } from "@/types";

import styles from "./Deployment.module.css";

class Deployment extends StatefulComponent<HTMLLIElement> {
  private _deployment: DeploymentType;

  constructor({ deployment }: { deployment: DeploymentType }) {
    super();

    this._element = document.createElement("li");
    this._element.id = `deployment-${deployment.id}`;
    this._deployment = deployment;

    this.render();
  }

  override render() {
    if (!this._element) {
      return;
    }

    this._element.innerHTML = "";
    this._element.dataset.testid = "deployment";
    this._element.className = styles.container!;
    if (
      this._deployment.status === "FAILED" ||
      this._deployment.status === "CRASHED"
    ) {
      this._element.dataset.status = "failed";
      this._element.classList.add(styles.failed!);
    } else if (this._deployment.status === "SUCCESS") {
      this._element.dataset.status = "success";
      this._element.classList.add(styles.success!);
    } else if (
      this._deployment.status === "DEPLOYING" ||
      this._deployment.status === "BUILDING"
    ) {
      this._element.dataset.status = "pending";
      this._element.classList.add(styles.pending!);
    } else {
      this._element.dataset.status = "default";
      this._element.classList.add(styles.default!);
    }

    const updatedAt = new Date(this._deployment.updatedAt).toLocaleString();
    const updatedAtElement = document.createElement("time");
    updatedAtElement.dataset.testid = "deployment__updated-at";
    updatedAtElement.className = styles.updatedAt!;
    updatedAtElement.dateTime = this._deployment.updatedAt;
    updatedAtElement.textContent = updatedAt;
    this._element.appendChild(updatedAtElement);
  }
}

export default Deployment;
