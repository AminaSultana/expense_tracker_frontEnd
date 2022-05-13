import React, { useState, useRef, useContext } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import classes from "./AuthForm.module.css";
import { authActions } from "../../store/auth";

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();

  const navigate = useNavigate()

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    let enteredConfirmPassword;
    if (!isLogin) {
      enteredConfirmPassword = confirmPasswordInputRef.current.value;
      if (enteredPassword !== enteredConfirmPassword) {
        alert("Password did not match");
        passwordInputRef.current.value = "";
        confirmPasswordInputRef.current.value = "";
        return;
      }
    }

    let url;
    if (!isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCJxA_K5UfddM0iHg_NzvLXksyPx1KWeV4";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCJxA_K5UfddM0iHg_NzvLXksyPx1KWeV4";
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error.message);
      }
      const data = await response.json();
      if (isLogin) {
        dispatch(authActions.login(data.idToken))
        localStorage.setItem("token", data.idToken);
        localStorage.setItem("email", enteredEmail)
        navigate("/home");
        return;
      }
      setIsLogin(true);
      passwordInputRef.current.value = "";
      emailInputRef.current.value = "";
      setIsLoading(true);
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
  };


  let content = <p>Create New User</p>;
  if (isLoading) {
    content = "Sending request";
  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              required
              ref={confirmPasswordInputRef}
            />
          </div>
        )}
        <div className={classes.actions}>
          <button type="submit">{isLogin ? "Login" : content}</button>
          {isLogin && <Link to={'/password-reset'}>Forgot password?</Link>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "New user? Sign Up" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
