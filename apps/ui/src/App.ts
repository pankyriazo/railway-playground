import api from "@/api";

const App = () => {
  const component = document.createElement("div");
  component.id = "app";
  component.innerHTML = "Loading...";

  api
    .getProjectList("18ee3ebd-813f-4401-a508-f0b7a62c5b9e")
    .then((projects: any) => {
      component.innerHTML = `
      <h1>Projects</h1>
      <ul>
        ${projects
          .map((project: { name: any }) => `<li>${project.name}</li>`)
          .join("")}
      </ul>
    `;
    })
    .catch((error: any) => {
      component.innerHTML = `Error: ${error.message}`;
    });

  return component;
};

export default App;
