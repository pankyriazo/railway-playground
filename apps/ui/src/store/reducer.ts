import { Action, State } from "./types";
import { initialState } from "./store";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "RESET":
      return initialState;
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "SET_PROJECTS":
      return { ...state, projects: action.payload };
    case "ADD_DEPLOYMENT":
      return {
        ...state,
        deployments: { ...state.deployments, ...action.payload },
      };
    case "REMOVE_DEPLOYMENT":
      const { [action.payload]: _, ...deployments } = state.deployments;
      return { ...state, deployments };
    default:
      return state;
  }
};

export default reducer;
