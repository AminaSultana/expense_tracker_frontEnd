import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ExpenseForm from "../ExpenseForm";

const store = () => {};

const MockComponent = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ExpenseForm />
      </BrowserRouter>
    </Provider>
  );
};

test("renders label", () => {
  render(<MockComponent />);
  const linkElement = screen.getByRole("label", { name: "Category" });
  expect(linkElement).toBeInTheDocument();
});
