import { Component } from "@/types";
import TokenInput from "@/components/TokenInput";
import Instructions from "@/components/Instructions";
import Projects from "@/components/Projects";

import styles from "./App.module.css";

class App extends Component<DocumentFragment> {
  constructor() {
    super();

    this._element = document.createDocumentFragment();

    this.render();
  }

  override render() {
    if (!this._element) {
      return;
    }

    this._element.textContent = "";

    const header = document.createElement("header");
    header.className = styles.header!;
    const headerInner = document.createElement("div");
    headerInner.className = "container";
    headerInner.innerHTML = `
      <h1 class="title" data-testid="title">
        <a href="/" title="Railway Playground home" data-testid="title-link">
          Railway Playground
        </a>
      </h1>
    `;
    header.appendChild(headerInner);
    this._element.appendChild(header);

    const wrapper = document.createElement("main");
    wrapper.className = "container";

    const input = new TokenInput();
    const inputSection = document.createElement("section");

    const instructions = new Instructions();
    inputSection.appendChild(input.element);
    inputSection.appendChild(instructions.element);

    wrapper.appendChild(inputSection);

    const projects = new Projects();
    const projectsSection = document.createElement("section");
    projectsSection.appendChild(projects.element);
    wrapper.appendChild(projectsSection);

    this._element.appendChild(wrapper);
  }
}

export default App;
