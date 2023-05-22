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
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="rounded-2xl border border-white/10 bg-bkg-2 py-5 text-slate-300">
        <h1 className="mb-3 text-3xl ">
          {endpoint === "login" ? "Log in" : "Sign up"}
        </h1>
        <form
          className="flex flex-col px-10 text-left  first:pb-2"
          onSubmit={handleSubmit}
        >
          <label for="" className="">
            <p>Name</p>
          </label>
          <input
            type="text"
            id="login_name"
            name="name"
            className="mb-3 rounded-md"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
          <label for="login__password">Password</label>
          <input
            type="password"
            id="login__password"
            name="passowrd"
            className="mb-3 rounded-md"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <button type="submit" value="Submit" className="bg-black/90">
            Send magic link
          </button>
          <span className="mt-3 px-12 text-center">
            {endpoint === "login" ? (
              <>
                Don't have an account?
                <a
                  href="/register"
                  className="delay-250 text-center font-semibold transition ease-in-out"
                >
                  {" "}
                  <span className="block">Sign up</span>
                </a>
                for free
              </>
            ) : (
              <>
                Already have an account?
                <a
                  href="/register"
                  className="delay-250 text-center font-semibold transition ease-in-out"
                >
                  <span className="block"> Log in </span>
                </a>
              </>
            )}
          </span>
        </form>
      </div>
    </div>
  );
}
