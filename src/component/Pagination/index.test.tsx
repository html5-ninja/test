import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Pagination from ".";

const renderPagination = (page: number, totalPages: number) =>
  render(<MemoryRouter><Pagination page={page} totalPages={totalPages} /></MemoryRouter>);

test("renders null when totalPages is 1", () => {
  const { container } = renderPagination(1, 1);
  expect(container.firstChild).toBeNull();
});

test("prev/next are spans on boundaries, links otherwise", () => {
  renderPagination(1, 5);
  expect(screen.getByText("«").tagName).toBe("SPAN");
  expect(screen.getByText("»").closest("a")).toHaveAttribute("href", "?page=2");
});

test("page numbers render correctly", () => {
  renderPagination(2, 5);
  expect(screen.getByText("1").closest("a")).toHaveAttribute("href", "?page=1");
  expect(screen.getByText("2").tagName).toBe("SPAN");
  expect(screen.getByText("»").closest("a")).toHaveAttribute("href", "?page=3");
});
