export class Component<T> {
  protected _element: T | null = null;

  constructor() {}

  get element(): T {
    if (!this._element) {
      return document.createDocumentFragment() as unknown as T;
    }

    return this._element;
  }

  render() {}
}

export class StatefulComponent<T = HTMLElement> extends Component<T> {
  protected _state: "idle" | "loading" | "loaded" | "error" = "idle";

  protected get state(): "idle" | "loading" | "loaded" | "error" {
    return this._state;
  }

  unsubscribe() {}

  setState(state: "idle" | "loading" | "loaded" | "error"): void {
    this._state = state;
    this.render();
  }
}
