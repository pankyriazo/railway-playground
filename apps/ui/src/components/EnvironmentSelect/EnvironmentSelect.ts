import { Component } from "@/types";
import { Edges, Node } from "@monorepo/types";

class EnvironmentSelect extends Component<HTMLSelectElement> {
  private _options: Edges<Node> = { edges: [] };
  private _selected: Node;
  private _onChange: (environment: Node) => void;

  constructor({
    options,
    selected,
    onChange,
  }: {
    options: Edges<Node>;
    selected: Node;
    onChange: (environment: Node) => void;
  }) {
    super();

    this._element = document.createElement("select");
    this._element.id = "environments";

    this._options = options;
    this._selected = selected;
    this._onChange = onChange;

    this._registerEvents();

    this.render();
  }

  private _registerEvents() {
    if (!this._element) {
      return () => {};
    }

    const handler = (event: Event) => {
      const target = event.target as HTMLSelectElement;

      const environment = this._options.edges.find(
        (edge) => edge.node.id === target.value
      );

      if (!environment) {
        return;
      }

      this._onChange(environment.node);
    };

    this._element.addEventListener("change", handler);

    return () => {
      this._element?.removeEventListener("change", handler);
    };
  }

  override render() {
    if (!this._element) {
      return;
    }

    this._element.innerHTML = "";
    this._element.dataset.testid = "environment-select";

    for (const { node: environment } of this._options.edges) {
      const option = document.createElement("option");
      option.dataset.testid = "environment-select__option";
      option.value = environment.id;
      option.textContent = environment.name;
      this._element.appendChild(option);
    }

    this._element.value = this._selected.id;
  }
}

export default EnvironmentSelect;
