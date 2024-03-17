import { Action } from "./types";
import store from "./store";

describe("Store", () => {
  it("should update state when an action is dispatched", () => {
    expect(store.state.token).toBe("");

    const listener = jest.fn();
    store.subscribe(listener);

    const action: Action = { type: "SET_TOKEN", payload: "token" };
    store.dispatch(action);

    expect(store.state.token).toBe("token");
  });

  it("should notify all listeners when state changes", () => {
    const listener = jest.fn();
    store.subscribe(listener);

    const action: Action = { type: "SET_TOKEN", payload: "token" };
    store.dispatch(action);

    expect(listener).toHaveBeenCalled();
    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({ token: "token" })
    );
  });

  it("should unsubscribe a listener", () => {
    const listener = jest.fn();
    const unsubscribe = store.subscribe(listener);

    listener.mockClear();

    const action_1: Action = { type: "SET_TOKEN", payload: "token-1" };
    store.dispatch(action_1);

    expect(listener).toHaveBeenCalled();

    listener.mockClear();
    unsubscribe();

    const action_2: Action = { type: "SET_TOKEN", payload: "token-2" };
    store.dispatch(action_2);

    expect(listener).not.toHaveBeenCalled();
  });
});
