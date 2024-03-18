import "@/styles/reset.css";
import "@/styles/variables.css";
import "@/styles/fonts.css";
import "@/styles/classes.css";
import "@/styles/globals.css";

import App from "@/components/App";

const render = () => {
  const app = new App();

  document.body.appendChild(app.element);
};

render();
