import { render } from "@/test-helpers";
import { mockGetDeploymentList } from "@/api/__mocks__/getDeploymentList";
import Deployment from "./Deployment";

describe("Deployment", () => {
  const deployment = mockGetDeploymentList.data.deployments.edges[0].node;
  const statuses = {
    FAILED: "failed",
    CRASHED: "failed",
    SUCCESS: "success",
    DEPLOYING: "pending",
    BUILDING: "pending",
  } as const;

  it("should render the deployment", () => {
    render(Deployment, { deployment });

    const deploymentElement = document.querySelector(
      "[data-testid=deployment]"
    );

    expect(deploymentElement).toMatchSnapshot();
  });

  Object.keys(statuses).forEach((value) => {
    describe(`when the deployment's status is '${value}'`, () => {
      const status = statuses[value as keyof typeof statuses];

      it(`should render the deployment as ${status}`, () => {
        render(Deployment, { deployment: { ...deployment, status: value } });

        const deploymentElement = document.querySelector(
          "[data-testid=deployment]"
        );

        expect(
          deploymentElement!.attributes.getNamedItem("data-status")!.value
        ).toBe(status);
      });
    });
  });

  describe("when the deployment's status is unknown", () => {
    it("should render the deployment as default", () => {
      render(Deployment, { deployment: { ...deployment, status: "UNKNOWN" } });

      const deploymentElement = document.querySelector(
        "[data-testid=deployment]"
      );

      expect(
        deploymentElement!.attributes.getNamedItem("data-status")!.value
      ).toBe("default");
    });
  });
});
