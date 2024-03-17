import { Deployment, Edges, Projects } from "@monorepo/types";

export type State = {
  token: string;
  projects: Projects;
  deployments: Record<string, Edges<Deployment>>;
};

interface ActionBase {
  type: string;
  payload: unknown;
}

interface SetTokenAction extends ActionBase {
  type: "SET_TOKEN";
  payload: string;
}
interface SetProjectsAction extends ActionBase {
  type: "SET_PROJECTS";
  payload: Projects;
}
interface AddDeploymentAction extends ActionBase {
  type: "ADD_DEPLOYMENT";
  payload: Record<string, Edges<Deployment>>;
}
interface RemoveDeploymentAction extends ActionBase {
  type: "REMOVE_DEPLOYMENT";
  payload: string;
}

export type Action =
  | SetTokenAction
  | SetProjectsAction
  | AddDeploymentAction
  | RemoveDeploymentAction;

export type Listener = (state: State) => void;

export type Reducer = (state: State, action: Action) => State;
