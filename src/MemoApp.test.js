import { render, screen } from "@testing-library/react";
import MemoApp from "./MemoApp";

test("renders learn react link", () => {
  render(<MemoApp />);
  const linkElement = screen.getByText(/Super Simple Memo App/i);
  expect(linkElement).toBeInTheDocument();
});
