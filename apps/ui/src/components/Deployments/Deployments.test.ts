import { mockComponent, render } from "@/test-helpers";
import { mockGetDeploymentList } from "@/api/__mocks__/getDeploymentList";
import Deployments from "./Deployments";

jest.mock("@/components/Deployment", () => mockComponent("Deployment"));

describe("Deployments", () => {
  describe("when the deployments are empty", () => {
    it("should render empty message", () => {
      render(Deployments, {
        deployments: {
          edges: [],
        },
      });

      const empty = document.querySelector("[data-testid=deployments__empty]");

      expect(empty).not.toBeNull();
      expect(empty!.textContent).toBe("No deployments found.");
      expect(empty).toMatchSnapshot();
    });
  });

  describe("when the deployments are not empty", () => {
    it("should render deployments", () => {
      render(Deployments, {
        deployments: mockGetDeploymentList.data.deployments,
      });

      const deployments = document.querySelectorAll(
        "[data-component=Deployment]"
      );

      expect(deployments).toHaveLength(1);
      expect(deployments).toMatchSnapshot();
    });
  });
});
