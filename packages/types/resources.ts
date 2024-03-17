export type WithErrors<T> =
  | {
      data: T;
      errors?: never;
    }
  | {
      data: null;
      errors: Array<{
        message: string;
      }>;
    };

export type Node = {
  id: string;
  name: string;
};

export type Edges<T> = {
  edges: Array<{
    node: T;
  }>;
};

export type Project = Node & {
  services: Edges<Node>;
  plugins: Edges<Node>;
  environments: Edges<Node>;
};

export type Projects = WithErrors<{
  me: {
    projects: Edges<Project>;
  };
}>;

export type Deployment = {
  canRedeploy: boolean;
  canRollback: boolean;
  environmentId: string;
  id: string;
  staticUrl: string | null;
  status: string;
  updatedAt: string;
  url: string | string;
};

export type Deployments = WithErrors<{
  deployments: Edges<Deployment>;
}>;
