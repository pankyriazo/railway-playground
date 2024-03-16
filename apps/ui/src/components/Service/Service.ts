import { Node } from "@monorepo/types";

class Service {
  private _element: HTMLLIElement;
  private _service: Node;

  constructor(service: Node) {
    this._element = document.createElement("li");
    this._element.id = `service-${service.id}`;
    this._service = service;
  }

  private _build() {
    this._element.innerHTML = `<h3>${this._service.name}</h3>`;
  }

  public get service() {
    return this._service;
  }

  public get element() {
    this._build();
    return this._element;
  }
}

export default Service;
