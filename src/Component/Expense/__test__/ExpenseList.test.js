import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import ExpenseList from "../ExpenseList";

const initialStore={}
const reducer = combineReducers({
    
  // here we will be adding reducers
})

const store = configureStore(initialStore, reducer)

const MockComponent = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ExpenseList />
      </BrowserRouter>
    </Provider>
  );
};

test('should render "Download file" when button is clicked', () => {
  render(<MockComponent />);
  const buttonElement = screen.getByRole("button");
  userEvent.click(buttonElement);

  const paraElement = screen.getByText(/download file/i);
  expect(paraElement).toBeInTheDocument();
});
