beforeAll(() => {
  global.__IS_PRODUCTION__ = false;
});

afterEach(() => {
  jest.restoreAllMocks();
});
