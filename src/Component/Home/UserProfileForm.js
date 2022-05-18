import React, {useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import classes from "./UserProfileForm.module.css";

const UserProfileForm = () => {
  const [preFillData, setPreFillData] = useState([])
  const displayNameRef = useRef();
  const photoUrlRef = useRef();
  const idToken=useSelector(state=>state.auth.token)

  const preFillProfile = async()=>{
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCJxA_K5UfddM0iHg_NzvLXksyPx1KWeV4`,{
      method:'POST',
      body: JSON.stringify({idToken: idToken}),
      headers:{
        'Content-Type':'application/json'
      }
    })
    const data = await response.json();
    console.log("prfilldata",data.users[0]);
    setPreFillData(data.users[0])

  }

  useEffect(() => {
    preFillProfile()
  }, []);

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
          idToken: idToken,
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
            <input type="text" ref={displayNameRef} defaultValue={preFillData.displayName}></input>
          </span>
          <span>
            <img></img>
            <label>Profile Photo URL:</label>
            <input type="text" ref={photoUrlRef} defaultValue={preFillData.photoUrl}></input>
          </span>
        </div>
        <button className={classes.form_btn}>Update</button>
      </form>
    </div>
  );
};

export default UserProfileForm;
