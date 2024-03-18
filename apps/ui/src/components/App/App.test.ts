import { mockComponent, render } from "@/test-helpers";
import App from "./App";

jest.mock("@/components/TokenInput", () => mockComponent("TokenInput"));
jest.mock("@/components/Instructions", () => mockComponent("Instructions"));
jest.mock("@/components/Projects", () => mockComponent("Projects"));

describe("App", () => {
  beforeEach(() => {
    render(App);
  });

  it("should render", () => {
    expect(document.body).toMatchSnapshot();
  });

  describe("header", () => {
    it("should render the correct title", () => {
      const header = document.querySelector("header");

      expect(header).not.toBeNull();
      expect(header!.textContent).toContain("Railway Playground");
    });

    it("should render the correct title link", () => {
      const titleLink = document.querySelector("a");

      expect(titleLink!.getAttribute("href")).toBe("/");
    });
  });

  it("should render the TokenInput component", () => {
    const tokenInput = document.querySelector("[data-component='TokenInput']");

    expect(tokenInput).not.toBeNull();
  });

  it("should render the Instructions component", () => {
    const instructions = document.querySelector(
      "[data-component='Instructions']"
    );

    expect(instructions).not.toBeNull();
  });

  it("should render the Projects component", () => {
    const projects = document.querySelector("[data-component='Projects']");

    expect(projects).not.toBeNull();
  });
});
