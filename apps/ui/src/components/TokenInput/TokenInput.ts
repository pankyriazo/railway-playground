import store from "@/store";
import { Component } from "@/types";

import styles from "./TokenInput.module.css";

class TokenInput extends Component<HTMLFormElement> {
  private _token: string = "";

  constructor() {
    super();

    this._element = document.createElement("form");
    this._element.id = "form";
    this._element.addEventListener("submit", this._handleSubmit.bind(this));

    this._subscribe();
    this._checkLocalStorage();

    this.render();
  }

  private _checkLocalStorage() {
    const token = localStorage.getItem("token");

    if (token) {
      store.dispatch({
        type: "SET_TOKEN",
        payload: token,
      });
    }
  }

  private _subscribe() {
    return store.subscribe((state) => {
      if (state.token !== this._token) {
        this._token = state.token;

        if (state.token === "") {
          localStorage.removeItem("token");
        } else {
          localStorage.setItem("token", this._token);
        }

        this.render();
      }
    });
  }

  private _handleSubmit(event: Event) {
    event.preventDefault();

    if (!this._element) {
      return;
    }

    const token = (this._element.querySelector("#token") as HTMLInputElement)
      .value;

    store.dispatch({
      type: "SET_TOKEN",
      payload: token,
    });
  }

  override render() {
    if (!this._element) {
      return;
    }

    this._element.innerHTML = "";
    this._element.dataset.testid = "token-input__form";

    const containerElement = document.createElement("div");
    containerElement.className = styles.container!;

    const labelElement = document.createElement("label");
    labelElement.dataset.testid = "token-input__label";
    labelElement.htmlFor = "token";
    labelElement.textContent = "Access token";
    labelElement.className = styles.label!;
    containerElement.appendChild(labelElement);

    const inputElement = document.createElement("input");
    inputElement.dataset.testid = "token-input__input";
    inputElement.type = "password";
    inputElement.id = "token";
    inputElement.className = styles.input!;
    inputElement.value = this._token;
    inputElement.placeholder = "Enter your access token";
    inputElement.required = true;
    inputElement.oninvalid = () => {
      inputElement.setCustomValidity("Please enter your access token");
    };
    inputElement.oninput = () => {
      inputElement.setCustomValidity("");
    };
    if (this._token === "") {
      inputElement.autofocus = true;
    }
    containerElement.appendChild(inputElement);

    const buttonElement = document.createElement("button");
    buttonElement.dataset.testid = "token-input__submit";
    buttonElement.type = "submit";
    buttonElement.textContent = this._token ? "Update token" : "Use token";
    buttonElement.className = styles.btn!;
    containerElement.appendChild(buttonElement);

    this._element.appendChild(containerElement);
  }
}

export default TokenInput;
