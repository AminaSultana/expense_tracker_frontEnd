import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EmailConfirmation = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search)
    const idToken = queryParams.get('token')
    const navigate = useNavigate()
    
    const verifyEmailHandler = async () => {
        try {
          const response = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCJxA_K5UfddM0iHg_NzvLXksyPx1KWeV4",
            {
              method: "POST",
              body: JSON.stringify({
                requestType: "VERIFY_EMAIL",
                idToken: idToken,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            const responseBody = await response.json();
            throw new Error(responseBody.error.message);
          }
        } catch (error) {
        }
      };
    verifyEmailHandler()
    const proceedHandler=(e)=>{
        e.preventDefault()
        console.log("");
        navigate("/")
    }

  return (
    <div>
      <h1>Email Confirmation</h1>
      <h3>An email with the account confirmation has been sent to your email</h3>
      <h3>Please confirm it and come back  to proceed!</h3>
      <button onClick={proceedHandler}>Proceed</button>
    </div>
  );
}

export default EmailConfirmation;
