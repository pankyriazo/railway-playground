import { render } from "@/test-helpers";
import store from "@/store";
import Instructions from "./Instructions";

describe("Instructions", () => {
  beforeEach(() => {
    render(Instructions);
  });

  describe("when the token is empty", () => {
    it("should render the correct text", () => {
      const instructions = document.querySelector("[data-testid=instructions]");

      expect(instructions).not.toBeNull();
      expect(instructions).toMatchSnapshot();
    });
  });

  describe("when the token is not empty", () => {
    it("should not render", () => {
      store.dispatch({
        type: "SET_TOKEN",
        payload: "test-token",
      });

      render(Instructions);

      const instructions = document.querySelector("[data-testid=instructions]");

      expect(instructions!.textContent).toBe("");
      expect(instructions).toMatchSnapshot();
    });
  });
});
