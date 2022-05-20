import { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { expenseActions } from '../../store/expense';
import ExpenseListShow from './ExpenseListShow';

const ExpenseList = () => {
  const [premiumBtn, setPremiumBtn] = useState(false);
  const listOfItems = useSelector(state=>state.expense.expenseItems)
  const amount = useSelector(state=>state.expense.amount)
  const dispatch=useDispatch()

  useEffect(() => {
   if(amount>10000){
     setPremiumBtn(true)
   }
  }, [amount]);
    const expenses = listOfItems.map((expense)=>{
        return(
           <ExpenseListShow
           key={expense.id}
           id={expense.id}
           amount={expense.amount}
           category={expense.category}
           description={expense.description}
           />
        )
    })
    const activatePremiumHandler=()=>{
      dispatch(expenseActions.activatePremium())
    }

  return (
    <div>
      {expenses}
      <p>Amount Spent: {amount}</p>
      {premiumBtn && <button onClick={activatePremiumHandler}>Activate Premium</button>}
    </div>
  );
}

export default ExpenseList;
