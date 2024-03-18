import { render } from "@/test-helpers";
import store from "@/store";
import TokenInput from "./TokenInput";

describe("TokenInput", () => {
  beforeEach(() => {
    render(TokenInput);
  });

  afterEach(() => {
    store.dispatch({ type: "RESET" });
  });

  it("should render", () => {
    expect(document.body).toMatchSnapshot();
  });

  it("should render the correct label", () => {
    const label = document.querySelector("label");

    expect(label).not.toBeNull();
    expect(label!.textContent).toBe("Access token");
  });

  it("should render the input as password type", () => {
    const input = document.querySelector("input");

    expect(input!.getAttribute("type")).toBe("password");
  });

  describe("submit button", () => {
    it("should render", () => {
      const button = document.querySelector("button");

      expect(button).not.toBeNull();
    });

    it("should render the correct text when the token is empty", () => {
      const button = document.querySelector("button");

      expect(button!.textContent).toBe("Use token");
    });

    it("should render the correct text when the token is not empty", () => {
      store.dispatch({
        type: "SET_TOKEN",
        payload: "test-token",
      });

      render(TokenInput);

      const button = document.querySelector("button");

      expect(button!.textContent).toBe("Update token");
    });
  });

  describe("on submit button click", () => {
    let storeSpy: jest.SpyInstance;

    beforeEach(() => {
      storeSpy = jest.spyOn(store, "dispatch");
    });

    afterEach(() => {
      storeSpy.mockRestore();
    });

    describe("when the token is empty", () => {
      it("should not dispatch the SET_TOKEN action", () => {
        const submitButton = document.querySelector("button");
        submitButton!.click();

        expect(storeSpy).not.toHaveBeenCalled();
      });
    });

    describe("when the token is not empty", () => {
      it("should dispatch the SET_TOKEN action", () => {
        const input = document.querySelector("input");
        input!.value = "token";
        input!.dispatchEvent(new Event("input"));

        const submitButton = document.querySelector("button");
        submitButton!.click();

        expect(storeSpy).toHaveBeenCalledTimes(1);
        expect(storeSpy).toHaveBeenCalledWith({
          type: "SET_TOKEN",
          payload: "token",
        });
      });
    });
  });
});
