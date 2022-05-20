import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const PasswordReset = () => {
  const [isloading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef();


  const resetPasswordHandler = async (event) => {
    event.preventDefault();
    setIsloading(true);
    const enteredEmailRef = emailRef.current.value;
    try {
      await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCJxA_K5UfddM0iHg_NzvLXksyPx1KWeV4",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: enteredEmailRef,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Link has been sent to your mail. Open to reset password");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
    setIsloading(false);
    console.log("");
  };
  return (
    <>
      <h1>Reset Password</h1>
      <input type="text" placeholder="Enter Email" ref={emailRef} required />
      <button onClick={resetPasswordHandler}>Reset</button>
      {isloading && <p>Sending request...</p>}
    </>
  );
};

export default PasswordReset;
