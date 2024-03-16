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

export type Projects = {
  data: {
    me: {
      projects: Edges<Project>;
    };
  };
};
