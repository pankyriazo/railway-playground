global.MutationObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe(element, initObject) {}
};

afterEach(() => {
  jest.restoreAllMocks();
});
