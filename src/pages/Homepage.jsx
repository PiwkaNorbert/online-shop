import React from "react";
import Login from "./Login";
import Header from "../comp/Header";

const Homepage = () => {
  return (
    <div className="flex h-screen w-full flex-col">
      <Header />
      <div className="flex flex-col items-center justify-center ">
        <h1 cla>Welcome to our store</h1>
      </div>
    </div>
  );
};

export default Homepage;
