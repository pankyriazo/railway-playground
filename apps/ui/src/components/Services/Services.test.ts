import { render } from "@/test-helpers";
import { mockGetProjectList } from "@/api/__mocks__/getProjectList";
import Services from "./Services";

describe("Services", () => {
  const project = mockGetProjectList.data.me.projects.edges[0].node;
  const mockProps = {
    project,
    services: project.services,
    environment: project.environments.edges[0].node,
  };

  beforeEach(() => {
    render(Services, mockProps);
  });

  it("should render", () => {
    const services = document.querySelector("[data-testid=services]");

    const serviceList = document.querySelector("[data-testid=services__list]");
    const serviceItems = serviceList?.querySelectorAll("li");

    expect(serviceItems).toHaveLength(2);
    expect(services).toMatchSnapshot();
  });
});
