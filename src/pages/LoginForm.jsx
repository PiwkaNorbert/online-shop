import React, { useState } from "react";

export default function LoginForm({ endpoint }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      username: name,
      password: password,
    };

    try {
      const response = await fetch(
        `http://192.168.15.115:7777/api/${endpoint}/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) throw new Error(`Could not Send ${endpoint} data`);
      if (endpoint === "register") {
        return (window.location.href = "/login");
        // console.log("breh");
      }
      if (endpoint === "login") {
        const data = await response.json();
        sessionStorage.setItem("token", data.token);
        return (window.location.href = "/category");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setName("");
      setPassword("");
    }
  };
  return (
    <form className="main__login-form" onSubmit={handleSubmit}>
      <label for="login_name">
        <p>Name</p>
      </label>
      <input
        type="text"
        id="login_name"
        name="name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        required
      />
      <label for="login__password">
        <p>Password</p>
      </label>
      <input
        type="password"
        id="login__password"
        name="passowrd"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        required
      />
      <button type="submit" value="Submit" className="">
        Submit
      </button>
    </form>
  );
}
