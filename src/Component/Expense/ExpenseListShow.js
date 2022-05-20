import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const ExpenseListShow = (props) => {
  const email = useSelector((state) => state.auth.userEmail);

  const deleteExpenseHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://expense-tracker-a5dab-default-rtdb.firebaseio.com/${email}/${props.id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Could not delete expense");
      }
      alert("Expense deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const editExpenseHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <li>
      {props.amount}
      {props.category}
      {props.description}
      {<button onClick={deleteExpenseHandler}>Delete</button>}
      {<button onClick={editExpenseHandler}>Edit </button>}
    </li>
  );
};

export default ExpenseListShow;
