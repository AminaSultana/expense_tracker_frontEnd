import React, { useContext, useRef } from "react";
import CartContext from "../../store/cart-context";

import classes from "./ExpenseForm.module.css";

const ExpenseForm = () => {
  const cartCtx = useContext(CartContext);
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  const expenseSubmitHandler = async (event) => {
    event.preventDefault();
    const expense = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
    };
    cartCtx.addItems(expense);

    console.log(categoryRef.current.value);
  };

  return (
    <>
      <form onSubmit={expenseSubmitHandler} className={classes.form}>
        <div className={classes.amount}>
          <label>Amount</label>
          <input type="number" ref={amountRef} />
        </div>
        <div className={classes.description}>
          <label>Description</label>
          <input type="text" ref={descriptionRef} />
        </div>
        <div className={classes.category}>
          <label>Category</label>
          <select ref={categoryRef}>
            <option value="food">Food</option>
            <option value="travelling">Travelling</option>
            <option value="birthday">Birthday</option>
            <option value="shopping">Shopping</option>
            <option value="grocery">Grocery</option>
            <option value="medicine">Medicine</option>
          </select>
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </>
  );
};

export default ExpenseForm;
