import React from "react";
import "./sign_in_up.styles.scss";

const SignInUp = ({ mode = "login", show = false }) => {
  return show ? (
    <form className="submit-form" id="submit-form" action="submit">
      <p className="form--label">
        {mode === "login" ? "Sign In" : "Sign Up to"} Elite Lifestyle
      </p>
      <input
        type="email"
        className="input"
        placeholder="Email"
        name=""
        id="email--field"
      />
      <input
        type="password"
        className="input"
        placeholder="Password"
        name=""
        id="password--field"
      />
      <input
        type="submit"
        className="submit-btn"
        value={mode === "signIn" ? "Sign In" : "Sign Up"}
      />
    </form>
  ) : (
    <></>
  );
};

export default SignInUp;
