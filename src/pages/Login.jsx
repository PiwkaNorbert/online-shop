import React from "react";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <>
      <LoginForm endpoint={"login"} />
      <a href="/register">Register a new Account</a>
    </>
  );
};

export default Login;
