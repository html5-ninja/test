import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.mock("react-router-dom", () => ({
  Link: ({
    to,
    children,
    ...props
  }: {
    to: string;
    children: React.ReactNode;
  }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

import Pagination from ".";

const renderPagination = (page: number, totalPages: number) =>
  render(<Pagination page={page} totalPages={totalPages} />);

test("returns null when totalPages is 1", () => {
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
