import store from "@/store";

afterEach(() => {
  jest.restoreAllMocks();

  document.body.innerHTML = "";
  store.dispatch({ type: "RESET" });
});
