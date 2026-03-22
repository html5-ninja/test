import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from ".";

test("renders shop title", () => {
  render(<Header />);
  expect(screen.getByText("Shop")).toBeInTheDocument();
});
