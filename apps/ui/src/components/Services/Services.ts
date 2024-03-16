import { Edges, Node } from "@monorepo/types";
import Service from "@/components/Service";

class Services {
  private _element: HTMLUListElement;
  private _services: Edges<Node>;

  constructor(services: Edges<Node>) {
    this._element = document.createElement("ul");
    this._element.id = "services";
    this._services = services;
  }

  private _build() {
    this._services.edges.forEach(({ node: serviceData }) => {
      const service = new Service(serviceData);
      this._element.appendChild(service.element);
    });
  }

  public get services() {
    return this._services;
  }

  public get element() {
    this._build();
    return this._element;
  }
}

export default Services;
