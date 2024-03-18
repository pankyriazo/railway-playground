export const mockComponent = (name: string) => {
  const mockComponent = document.createElement("div");
  mockComponent.dataset.component = name;

  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => {
      return {
        element: mockComponent,
      };
    }),
  };
};

type Class = { new (...props: any): { element: Node } };
export const render = <T extends Class>(Component: T, ...props: any) => {
  const app = new Component(...props);

  document.body.appendChild(app.element);
};
