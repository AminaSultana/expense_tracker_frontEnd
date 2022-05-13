import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import AuthForm from "./Component/Auth/AuthForm";
import PasswordReset from "./Component/Auth/PasswordReset";
import Expense from "./Component/Expense/Expense";
import HomePage from "./Pages/HomePage";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/password-reset" element={<PasswordReset />} />
      </Routes>
      {isLoggedIn && <Expense />}
    </>
  );
}

export default App;
