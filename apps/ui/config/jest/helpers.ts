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

type Class = { new (): { element: Node } };
export const render = <T extends Class>(Component: T) => {
  const app = new Component();

  document.body.appendChild(app.element);
};
