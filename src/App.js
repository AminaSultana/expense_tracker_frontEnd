import { Link, Route, Routes } from "react-router-dom";
import { CSVLink} from 'react-csv'
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { handledarkMode } from "./store/darkModeAction";
import AuthForm from "./Component/Auth/AuthForm";
import PasswordReset from "./Component/Auth/PasswordReset";
import Expense from "./Component/Expense/Expense";
import HomePage from "./Pages/HomePage";
import EmailConfirmation from "./Component/Auth/EmailConfirmation";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const expenses=useSelector(state=>state.expense.expenseItems)
  const activatePremium = useSelector(state=>state.expense.activatePremiumState)
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.darkMode);
  const { isdarkMode } = mode;

  const switchDarkMode = () => {
    isdarkMode
      ? dispatch(handledarkMode(false))
      : dispatch(handledarkMode(true));
  };
  useEffect(() => {
    //changing color of body with darkmode in useEffect
    document.body.style.backgroundColor = isdarkMode ? "#292c35" : "#fff";
  }, [isdarkMode]);

  const headers=[
    {label:'Amount', key:'amount'},
    {label:'Description', key:'description'},
    {label:'Category', key:'category'}
  ]
  const csvExpense={
    filename:'Expenses.csv',
    headers: headers,
    data: expenses
  }
  
  return (
    <>
      <Routes>
        <Route path="/" element={!isLoggedIn && <AuthForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/emailconfirmation" element={<EmailConfirmation/>}/>
      </Routes>
      {activatePremium && 
      <div id="darkmode">
        <input
          type="checkbox"
          className="checkbox"
          id="checkbox"
          onChange={switchDarkMode}
          checked={isdarkMode}
        />
        <CSVLink {...csvExpense}>Download File</CSVLink>        
      </div>
}
    </>
  );
}

export default App;
