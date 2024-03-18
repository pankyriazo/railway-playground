import { Component } from "@/types";
import store from "@/store";

import styles from "./Instructions.module.css";

class Instructions extends Component<HTMLDivElement> {
  private _token: string = "";

  constructor() {
    super();

    this._element = document.createElement("div");

    this._subscribe();

    this.render();
  }

  private _subscribe() {
    return store.subscribe((state) => {
      if (state.token !== this._token) {
        this._token = state.token;

        this.render();
      }
    });
  }

  override render() {
    if (!this._element) {
      return;
    }

    this._element.innerHTML = "";
    this._element.className = "";
    this._element.dataset.testid = "instructions";

    if (this._token.length > 0) {
      return;
    }

    this._element.className = styles.container!;

    const p = document.createElement("p");
    p.textContent =
      "To get started, please enter your Railway access token. ☝️";
    this._element.appendChild(p);
  }
}

export default Instructions;
