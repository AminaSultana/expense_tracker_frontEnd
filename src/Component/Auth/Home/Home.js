import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../../store/auth-context";

import classes from "./Home.module.css";
import UserProfileForm from "./UserProfileForm";

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate()

  const completeBtnHandler = (event) => {
    event.preventDefault();
    setShowForm(true);
  };

  const verifyEmailHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCJxA_K5UfddM0iHg_NzvLXksyPx1KWeV4",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: authCtx.idToken,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if(!response.ok){
          const responseBody = response.json();
          throw new Error(responseBody.error.message);
          
        }
        alert("Email verified")

    } catch (error) {
      alert(error)
    }
    
    
  };

  const logoutHandler = ()=>{
    localStorage.removeItem("token")
    authCtx.logout()
    navigate("/");
  }

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
      <section>
        <button onClick={verifyEmailHandler}>Verify Email</button>
      </section>
    </div>
  );
};

export default Home;
