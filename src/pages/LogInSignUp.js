import React, { useState, useEffect } from "react";
import useValidation from "../validation/useValidation";
import { LogoIcon } from "../assets";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser, loginUser } from "../features/content/contentSlice";

const LogInSignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { userAuth } = useSelector((store) => store.content);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    repeatedPassword: "",
    bookmarks: [],
  });
  //
  const handleSubmitCallback = (status, values) => {
    console.log(status, values);
    if (status === "LOGIN"){}
    if (status === "SIGNUP"){
      dispatch(signUpUser(values))
    }
  };
  //
  useEffect(() => {
    if (userAuth){
      navigate("/");
    }
  },[userAuth])
  //
  const { validation, emailError, passwordError, repeatPasswordError } =
    useValidation(handleSubmitCallback, isSignUp);
  //
  // EMPTY INPUTS WHEN SWITCHING FORMS
  const handleEmptyInputs = () => {
    if (isSignUp) {
      setLoginData({
        email: "",
        password: "",
      });
    }
    if (!isSignUp) {
      setSignUpData({
        email: "",
        password: "",
        repeatedPassword: "",
        bookmarks: []
      });
    }
  };
  //
  useEffect(() => {
    handleEmptyInputs();
  }, [isSignUp]);
  //
  return (
    <div className="fixed top-0 left-0 h-full w-full bg-darkBlue z-20 flex flex-col items-center justify-center font-outfit font-light text-white">
      <LogoIcon className="relative bottom-[60px]" />
      <div className="max-w-[400px] bg-semiDarkBlue p-6 w-11/12 rounded-[10px] grid gap-10">
        <h2 className="text-[32px] font-light text-left">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>
        <form
          className="grid gap-6"
          name="login-signup-form"
          id="login-signup-form"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(signUpData)
            isSignUp ? validation(signUpData) : validation(loginData);
          }}
        >
          <div className="relative">
            <input
              className="bg-transparent border-b-[1px] border-b-greyishBlue pb-4 outline-none w-full"
              type="text"
              name="email"
              id="email"
              placeholder="Email address"
              value={isSignUp ? signUpData.email : loginData.email}
              style={{
                borderBottomColor: passwordError.isPasswordError
                  ? "#FC4747"
                  : "#5A698F",
              }}
              onChange={(e) => {
                isSignUp
                  ? setSignUpData({ ...signUpData, email: e.target.value })
                  : setLoginData({ ...loginData, email: e.target.value });
              }}
            />
            {emailError?.isEmailError && (
              <p className="text-red text-xs absolute bottom-1 right-0">
                {emailError.msg}
              </p>
            )}
          </div>
          <div className="relative">
            <input
              className="w-full bg-transparent border-b-[1px] border-b-greyishBlue pb-4 outline-none"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              style={{
                borderBottomColor: passwordError.isPasswordError
                  ? "#FC4747"
                  : "#5A698F",
              }}
              value={isSignUp ? signUpData.password : loginData.password}
              onChange={(e) => {
                isSignUp
                  ? setSignUpData({ ...signUpData, password: e.target.value })
                  : setLoginData({ ...loginData, password: e.target.value });
              }}
            />
            {passwordError?.isPasswordError && (
              <p className="text-red text-xs absolute bottom-1 right-0">
                {passwordError.msg}
              </p>
            )}
          </div>
          {isSignUp && (
            <div className="relative">
              <input
                className="w-full bg-transparent border-b-[1px] border-b-greyishBlue pb-4 outline-none"
                type="password"
                name="repeat-password"
                id="repeat-password"
                placeholder="Repeat Password"
                style={{
                  borderBottomColor: repeatPasswordError.isRepeatPasswordError
                    ? "#FC4747"
                    : "#5A698F",
                }}
                value={signUpData.repeatedPassword}
                onChange={(e) =>
                  setSignUpData({
                    ...signUpData,
                    repeatedPassword: e.target.value,
                  })
                }
              />
              {repeatPasswordError?.isRepeatPasswordError && (
                <p className="text-red text-xs absolute bottom-1 right-0">
                  {repeatPasswordError.msg}
                </p>
              )}
            </div>
          )}
        </form>
        <div className="grid gap-6">
          <button
            className="w-full bg-red h-12 rounded-md"
            type="submit"
            form="login-signup-form"
          >
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
