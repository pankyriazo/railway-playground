import { mockComponent, render } from "@/test-helpers";
import {
  mockGetProjectList,
  mockGetProjectListError,
} from "@/api/__mocks__/getProjectList";
import api from "@/api";
import store from "@/store";
import Projects from "./Projects";

jest.mock("@/components/Project", () => mockComponent("Project"));
jest.mock("@/api", () => ({
  getProjectList: () => Promise.resolve({} as any),
}));

describe("Projects", () => {
  let apiSpy: jest.SpyInstance;

  beforeEach(() => {
    apiSpy = jest.spyOn(api, "getProjectList");

    render(Projects);
  });

  afterEach(() => {
    apiSpy.mockRestore();
  });

  describe("when the token is empty", () => {
    it("should not fetch projects", () => {
      expect(apiSpy).not.toHaveBeenCalled();
    });

    it("should not render the title", () => {
      const title = document.querySelector("[data-testid=projects__title]");

      expect(title).toBeNull();
    });

    it("should not render any projects", () => {
      const projects = document.querySelector("[data-testid=projects]");

      expect(projects!.innerHTML).toBe("");
    });
  });

  describe("when the token is updated", () => {
    beforeEach(() => {
      store.dispatch({
        type: "SET_TOKEN",
        payload: "test-token",
      });
    });

    it("should fetch projects", () => {
      expect(apiSpy).toHaveBeenCalled();
    });

    it("should render the title", () => {
      const title = document.querySelector("[data-testid=projects__title]");

      expect(title!.textContent).toBe("Projects");
    });

    it("should render the loading state", async () => {
      const projects = document.querySelector("[data-testid=projects]");

      expect(projects!.innerHTML).not.toBe("");
      expect(projects).toMatchSnapshot();
    });
  });

  describe("when the projects are loaded", () => {
    beforeEach(() => {
      store.dispatch({
        type: "SET_PROJECTS",
        payload: mockGetProjectList,
      });
    });

    it("should render the title", () => {
      const title = document.querySelector("[data-testid=projects__title]");

      expect(title!.textContent).toBe("Projects");
    });

    it("should render the projects", () => {
      const projectsElement = document.querySelector("[data-testid=projects]");

      const projects = document.querySelectorAll("[data-component=Project]");

      expect(projects.length).toBe(1);
      expect(projectsElement).toMatchSnapshot();
    });
  });

  describe("when there is an error fetching the projects", () => {
    beforeEach(() => {
      store.dispatch({
        type: "SET_PROJECTS",
        payload: mockGetProjectListError,
      });
    });

    it("should render the error state", () => {
      const projects = document.querySelector("[data-testid=projects]");

      const errorTitle = projects!.querySelector(
        "[data-testid=projects__error-title]"
      );
      const errorText = projects!.querySelector(
        "[data-testid=projects__error-message]"
      );

      expect(errorTitle!.textContent).toBe("Error fetching projects");
      expect(errorText!.textContent).toBe("Unauthorized");
      expect(projects).toMatchSnapshot();
    });
  });
});
