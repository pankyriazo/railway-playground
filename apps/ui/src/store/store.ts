import reducer from "./reducer";
import { Action, Listener, Reducer, State } from "./types";

export const initialState: State = {
  token: "",
  projects: {
    data: null,
    errors: [],
  },
  deployments: {},
};

class Store {
  private _state: State;
  private _reducer: Reducer;
  private _listeners: Listener[] = [];

  constructor() {
    this._state = initialState;
    this._reducer = reducer;
  }

  get state(): State {
    return this._state;
  }

  private _notify(): void {
    this._listeners.forEach((listener) => listener(this._state));
  }

  dispatch(action: Action): void {
    this._state = this._reducer(this._state, action);
    this._notify();
  }

  subscribe(listener: Listener): () => void {
    this._listeners.push(listener);

    listener(this._state);

    return () => {
      this._listeners = this._listeners.filter((l) => l !== listener);
    };
  }
}

const store = new Store();

export default store;
