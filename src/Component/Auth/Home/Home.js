import React, { useState } from "react";

import classes from "./Home.module.css";
import UserProfileForm from "./UserProfileForm";

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const completeBtnHandler = () => {
    setShowForm(true);
  };

  return (
    <div>
      <section className={classes.section}>
        <span>
          <h1>
            Welcome to expense tracker
            </h1>
            </span>
        <span className={classes.profile}>
          <span>Your profile is incomplete.</span>
          <button className={classes.profile_btn} onClick={completeBtnHandler}>
            Complete now
          </button>
        </span>
      </section>
      <section>{showForm && <UserProfileForm />}</section>
    </div>
  );
};

export default Home;
