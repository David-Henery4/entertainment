import React, { useState, useEffect } from "react";
import { LogoIcon } from "../assets";

const LogInSignUp = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    repeatedPassword: "",
    bookmarks: []
  });
  //
  const handleEmptyInputs = () => {
    if (isSignUp) {
      setLoginData({
        email: "",
        password: ""
      })
    }
    if (!isSignUp) {
      setSignUpData({
        email: "",
        password: "",
        repeatedPassword: "",
      });
    }
  }
  //
  useEffect(() => {
    handleEmptyInputs()
  }, [isSignUp])
  //
  return (
    <div className="fixed top-0 left-0 h-full w-full bg-darkBlue z-20 flex flex-col items-center justify-center">
      <LogoIcon className="relative bottom-[60px]" />
      <div className="max-w-[400px] bg-semiDarkBlue p-6 w-11/12 rounded-[10px] grid gap-10">
        <h2 className="text-[32px] font-light text-left">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>
        <form className="grid gap-6">
          <input
            className="bg-transparent border-b-[1px] border-b-greyishBlue pb-4 outline-none"
            type="email"
            name="email"
            id="email"
            placeholder="Email address"
            value={isSignUp ? signUpData.email : loginData.email}
            onChange={(e) => {
              isSignUp
                ? setSignUpData({ ...signUpData, email: e.target.value })
                : setLoginData({ ...loginData, email: e.target.value });
            }}
          />
          <input
            className="bg-transparent border-b-[1px] border-b-greyishBlue pb-4 outline-none"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={isSignUp ? signUpData.password : loginData.password}
            onChange={(e) => {
              isSignUp
                ? setSignUpData({ ...signUpData, password: e.target.value })
                : setLoginData({ ...loginData, password: e.target.value });
            }}
          />
          {isSignUp && (
            <input
              className="bg-transparent border-b-[1px] border-b-greyishBlue pb-4 outline-none"
              type="password"
              name="repeat-password"
              id="repeat-password"
              placeholder="Repeat Password"
              value={signUpData.repeatedPassword}
              onChange={(e) =>
                setSignUpData({
                  ...signUpData,
                  repeatedPassword: e.target.value,
                })
              }
            />
          )}
        </form>
        <div className="grid gap-6">
          <button className="w-full bg-red h-12 rounded-md">
            {isSignUp ? "Create an account" : "Login to your account"}
          </button>
          <div className="flex gap-2 w-full justify-center">
            <p>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </p>
            <button className="text-red" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "Login" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInSignUp;
