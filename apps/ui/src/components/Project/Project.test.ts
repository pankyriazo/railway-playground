import { mockComponent, render } from "@/test-helpers";
import { mockGetProjectList } from "@/api/__mocks__/getProjectList";
import Project from "./Project";

jest.mock("@/components/Services", () => mockComponent("Services"));
jest.mock("@/components/EnvironmentSelect", () =>
  mockComponent("EnvironmentSelect")
);

describe("Project", () => {
  const mockProps = mockGetProjectList.data.me.projects.edges[0].node;

  beforeEach(() => {
    render(Project, mockProps);
  });

  it("should render", () => {
    const project = document.querySelector("[data-testid=project]");

    expect(project).toMatchSnapshot();
  });
});
