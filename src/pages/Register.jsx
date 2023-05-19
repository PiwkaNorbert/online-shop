import React from "react";
import LoginForm from "./LoginForm";

const Register = () => {
  return (
    <>
      <h2>Create a new Account</h2>
      <LoginForm endpoint={"register"} />
    </>
  );
};

export default Register;
