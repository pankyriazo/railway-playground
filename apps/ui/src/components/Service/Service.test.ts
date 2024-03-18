import { mockComponent, render } from "@/test-helpers";
import { mockGetProjectList } from "@/api/__mocks__/getProjectList";
import { mockGetDeploymentList } from "@/api/__mocks__/getDeploymentList";
import api from "@/api";
import store from "@/store";
import Service from "./Service";

jest.mock("@/components/Deployments", () => mockComponent("Deployments"));
jest.mock("@/api", () => ({
  getDeploymentList: () => Promise.resolve({} as any),
}));

describe("Service", () => {
  const project = mockGetProjectList.data.me.projects.edges[0].node;
  const mockProps = {
    project,
    service: project.services.edges[0].node,
    environment: project.environments.edges[0].node,
  };

  let apiSpy: jest.SpyInstance;

  beforeEach(() => {
    apiSpy = jest.spyOn(api, "getDeploymentList");

    render(Service, mockProps);
  });

  afterEach(() => {
    apiSpy.mockRestore();
  });

  describe("when the token is empty", () => {
    it("should not fetch deployments", () => {
      expect(apiSpy).not.toHaveBeenCalled();
    });

    it("should not render the title", () => {
      const title = document.querySelector("[data-testid=service__title]");

      expect(title).toBeNull();
    });

    it("should not render any deployments", () => {
      const deployments = document.querySelectorAll(
        "[data-component=Deployments]"
      );

      expect(deployments.length).toBe(0);
    });
  });

  describe("when the token is updated", () => {
    beforeEach(() => {
      store.dispatch({
        type: "SET_TOKEN",
        payload: "test-token",
      });
    });

    it("should fetch deployments", () => {
      expect(apiSpy).toHaveBeenCalled();
    });

    it("should render the title", () => {
      const title = document.querySelector("[data-testid=service__title]");

      expect(title!.textContent).toBe("fascinated-motion");
    });

    it("should render the loading state", async () => {
      const service = document.querySelector("[data-testid=service]");

      expect(service!.innerHTML).not.toBe("");
      expect(service).toMatchSnapshot();
    });
  });

  describe("when the deployments are loaded", () => {
    beforeEach(() => {
      store.dispatch({
        type: "ADD_DEPLOYMENT",
        payload: {
          [mockProps.service.id]: mockGetDeploymentList.data.deployments,
        },
      });
    });

    it("should render the title", () => {
      const title = document.querySelector("[data-testid=service__title]");

      expect(title!.textContent).toBe("fascinated-motion");
    });

    it("should render the deployments", () => {
      const service = document.querySelector("[data-testid=deployments]");

      const deployments = document.querySelectorAll(
        "[data-component=Deployments]"
      );

      expect(deployments.length).toBe(1);
      expect(service).toMatchSnapshot();
    });
  });
});
