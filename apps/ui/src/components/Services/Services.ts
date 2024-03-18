import { Edges, Node } from "@monorepo/types";
import { Component } from "@/types";
import Service from "@/components/Service";

import styles from "./Services.module.css";

class Services extends Component<HTMLUListElement> {
  private _project: Node;
  private _environment: Node;
  private _services: Edges<Node> = { edges: [] };

  constructor({
    project,
    services,
    environment,
  }: {
    project: Node;
    services: Edges<Node>;
    environment: Node;
  }) {
    super();

    this._element = document.createElement("ul");
    this._element.id = "services";
    this._project = project;
    this._environment = environment;
    this._services = services;

    this.render();
  }

  override render() {
    if (!this._element) {
      return;
    }

    this._element.innerHTML = "";
    this._element.dataset.testid = "services";

    const title = document.createElement("h4");
    title.className = styles.title!;
    title.textContent = "Services";

    this._element.appendChild(title);

    const list = document.createElement("ul");
    list.dataset.testid = "services__list";
    list.className = styles.list!;

    for (const { node: serviceData } of this._services.edges) {
      const service = new Service({
        project: this._project,
        service: serviceData,
        environment: this._environment,
      });
      list.appendChild(service.element);
    }

    this._element.appendChild(list);
  }
}

export default Services;
