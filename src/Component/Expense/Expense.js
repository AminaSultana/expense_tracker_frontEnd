import React from 'react';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import classes from './Expense.module.css'

const Expense = () => {
  return (
    <div className={classes.expense}>
      <ExpenseForm/>
      <ExpenseList/>
    </div>
  );
}

export default Expense;
