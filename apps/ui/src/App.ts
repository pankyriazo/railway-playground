import api from "@/api";
import Projects from "./components/Projects";

const App = () => {
  const element = document.createElement("div");
  element.id = "app";
  element.innerHTML = "Loading...";

  api
    .getProjectList("18ee3ebd-813f-4401-a508-f0b7a62c5b9e")
    .then((projectsData) => {
      const projects = new Projects(projectsData.data.me.projects);

      element.innerHTML = "<h1>Projects</h1>";

      element.appendChild(projects.element);
    })
    .catch((error: Error) => {
      element.innerHTML = `Error: ${error.message}`;
    });

  return element;
};

export default App;
