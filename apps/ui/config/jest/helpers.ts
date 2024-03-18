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
