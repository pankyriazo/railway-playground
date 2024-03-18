import { render } from "@/test-helpers";
import { mockGetProjectList } from "@/api/__mocks__/getProjectList";
import EnvironmentSelect from "./EnvironmentSelect";

describe("EnvironmentSelect", () => {
  const onEnvironmentChange = jest.fn();

  beforeEach(() => {
    render(EnvironmentSelect, {
      options: mockGetProjectList.data.me.projects.edges[0].node.environments,
      selected:
        mockGetProjectList.data.me.projects.edges[0].node.environments.edges[0]
          .node,
      onChange: onEnvironmentChange,
    });
  });

  afterEach(() => {
    onEnvironmentChange.mockClear();
  });

  it("should render select element", () => {
    const select = document.querySelector("[data-testid=environment-select]");

    expect(select).not.toBeNull();
    expect(select).toMatchSnapshot();
  });

  it("should render options", () => {
    const options = document.querySelectorAll(
      "[data-testid=environment-select__option]"
    );

    expect(options).toHaveLength(2);
    expect(options[0]!.textContent).toBe("production");
    expect(options[1]!.textContent).toBe("staging");
  });
});
