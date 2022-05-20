import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
import Expense from "../Expense/Expense";

import classes from "./Home.module.css";
import UserProfileForm from "./UserProfileForm";

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const dispatch=useDispatch()
  const navigate = useNavigate();

  const completeBtnHandler = (event) => {
    event.preventDefault();
    setShowForm((prev) => !prev);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email")
    dispatch(authActions.logout())
    navigate("/");
  };

  return (
    <div>
      <section className={classes.section}>
        <span>
          <h1>Welcome to expense tracker</h1>
         
          <button onClick={logoutHandler}>Logout</button>
        </span>
        <span className={classes.profile}>
          <span>Your profile is incomplete.</span>
          <button className={classes.profile_btn} onClick={completeBtnHandler}>
            Complete now
          </button>
        </span>
      </section>
      <section>{showForm && <UserProfileForm />}</section>
      <section>{<Expense/>}</section>
    </div>
  );
};

export default Home;
