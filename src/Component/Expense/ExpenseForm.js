import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/expense";
import classes from "./ExpenseForm.module.css";

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const email = useSelector((state)=>state.auth.userEmail)
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  
  const getExpenseFromDB = async () => {
    try {
      const response = await fetch(
        `https://expense-tracker-a5dab-default-rtdb.firebaseio.com/${email}.json`
      );
      if (!response.ok) {
        throw new Error("Could not fetch data.");
      }
      const expense = await response.json();
      let data = [];
      console.log("");
      let amount=0;
      for (const key in expense) {
        amount+=Number(expense[key].amount)
        data.push({
          id:key,
          amount: expense[key].amount,
          description: expense[key].description,
          category: expense[key].category,
        });
      }

      const expenseData={
        data:data,
        amount:amount
      }
      dispatch(expenseActions.addItems(expenseData));
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getExpenseFromDB();
  }, []);

  const addExpenseToDB = async (expense) => {
    try {
      const response = await fetch(
        `https://expense-tracker-a5dab-default-rtdb.firebaseio.com/${email}.json`,
        {
          method: "POST",
          body: JSON.stringify(expense),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Could not add expense.Something went wrong");
      }
      console.log("Expense added successfully");
      getExpenseFromDB();
    } catch (error) {
      console.log(error);
    }
  };

  const expenseSubmitHandler = (event) => {
    event.preventDefault();
    const expense = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
    };
    addExpenseToDB(expense);
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
            <option value="travelling">Travelling</option>
            <option value="food">Food</option>
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
