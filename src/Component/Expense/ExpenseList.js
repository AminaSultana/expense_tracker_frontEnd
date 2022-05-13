import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';

const ExpenseList = () => {
  const [premiumBtn, setPremiumBtn] = useState(false);
  const listOfItems = useSelector(state=>state.expense.expenseItems)
  const amount = useSelector(state=>state.expense.amount)
  useEffect(() => {
   if(amount>10000){
     setPremiumBtn(true)
   }
  }, [amount]);
    const expenses = listOfItems.map((expense)=>{
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
      <p>Amount Spent: {amount}</p>
      {premiumBtn && <button>ActivatePremium</button>}
    </div>
  );
}

export default ExpenseList;
