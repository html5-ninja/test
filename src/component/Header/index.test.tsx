import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

const setLanguage = jest.fn();

jest.mock("../../store/useAppStore", () => ({
  useAppStore: () => ({ language: "en", setLanguage }),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

import Header from ".";

beforeEach(() => render(<Header />));

test("renders title", () =>
  expect(screen.getByText("header.title")).toBeInTheDocument());

test("select has current language", () =>
  expect(screen.getByRole("combobox")).toHaveValue("en"));

test("calls setLanguage on change", () => {
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "fr" } });
  expect(setLanguage).toHaveBeenCalledWith("fr");
});
