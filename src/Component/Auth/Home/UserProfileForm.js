import React, { useContext, useRef } from "react";
import AuthContext from "../../../store/auth-context";
import classes from "./UserProfileForm.module.css";

const UserProfileForm = () => {
  const authCtx = useContext(AuthContext);
  const displayNameRef = useRef();
  const photoUrlRef = useRef();

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const enteredDisplayName = displayNameRef.current.value;
    const enteredPhotoUrl = photoUrlRef.current.value;

    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCJxA_K5UfddM0iHg_NzvLXksyPx1KWeV4";
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.idToken,
          displayName: enteredDisplayName,
          photoUrl: enteredPhotoUrl,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/type",
        },
      });
      if (!response.ok) {
        throw new Error("Could not update profile");
      }
      alert("Profile updated!");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className={classes.profile_main}>
      <h1>Contact Details</h1>
      <form onSubmit={formSubmitHandler} className={classes.form}>
        <div>
          <span>
            <img></img>
            <label>Full Name:</label>
            <input type="text" ref={displayNameRef}></input>
          </span>
          <span>
            <img></img>
            <label>Profile Photo URL:</label>
            <input type="text" ref={photoUrlRef}></input>
          </span>
        </div>
        <button className={classes.form_btn}>Update</button>
      </form>
    </div>
  );
};

export default UserProfileForm;
