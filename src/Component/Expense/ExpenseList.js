import React, { useContext } from 'react';
import CartContext from '../../store/cart-context';

const ExpenseList = () => {
    const cartCtx = useContext(CartContext)
    const expenses = cartCtx.listOfItems.map((expense)=>{
        return(
            <li>
                <span>
                    {expense.amount}
                    {expense.category}
                    {expense.description}
                </span>
            </li>
        )
    })
  return (
    <div>
      {expenses}
    </div>
  );
}

export default ExpenseList;
