import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BluePrint from ".";

describe("BluePrint", () => {
  it("renders title and subtitle", () => {
    render(<BluePrint title="Hello" subtitle="World" />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("World")).toBeInTheDocument();
  });
});
