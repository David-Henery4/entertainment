import { useEffect } from "react";
import { useState } from "react";

const useValidation = (callBackSubmit, isSignup) => {
  const [emailError, setEmailError] = useState({
    isEmailError: false,
    msg: "",
  });
  const [passwordError, setPasswordError] = useState({
    isPasswordError: false,
    msg: "",
  });
  const [repeatPasswordError, setRepeatPasswordError] = useState({
    isRepeatPasswordError: false,
    msg: "",
  });
  const [values, setValues] = useState({});
  //
  //
  const validateEmail = (initialEmail) => {
    if (initialEmail === "") {
      setEmailError({
        isEmailError: true,
        msg: "Can't be empty",
      });
    }
    if (
      !new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ).test(initialEmail)
    ) {
      setEmailError({
        isEmailError: true,
        msg: "Wrong format",
      });
    } else {
      const email = initialEmail;
      setEmailError({
        isEmailError: false,
        msg: "",
      });
      setValues((oldValues) => {
        return { ...oldValues, email };
      });
    }
  };
  //
  const validatePassword = (initialPassword) => {
    const password = initialPassword.trim();
    if (password === "") {
      setPasswordError({
        isPasswordError: true,
        msg: "Can't be empty",
      });
    }
    if (password.length >= 1 && password.length < 4) {
      setPasswordError({
        isPasswordError: true,
        msg: "Needs to be at least 4 characters",
      });
    }
    if (password !== "" && password.length >= 4) {
      setPasswordError({
        isPasswordError: false,
        msg: "",
      });
      setValues((oldValues) => {
        return { ...oldValues, password };
      });
    }
  };
  //
  const validateRepeatPassword = (initialRepeatPassword, initialPassword) => {
    const password = initialPassword.trim()
    const repeatPassword = initialRepeatPassword.trim()
    if (repeatPassword === "") {
      setRepeatPasswordError({
        isRepeatPasswordError: true,
        msg: "Can't be empty",
      });
    }
    if (password !== repeatPassword) {
      setRepeatPasswordError({
        isRepeatPasswordError: true,
        msg: "passwords need to match",
      });
    }
    if (
      repeatPassword !== "" &&
      repeatPassword.length >= 4 &&
      password === repeatPassword
    ) {
      setRepeatPasswordError({
        isRepeatPasswordError: false,
        msg: "",
      });
    }
  };
  //
  //
  const checkLogInInputs = ({ email, password }) => {
    validateEmail(email);
    validatePassword(password);
  };
  const checkSignUpInputs = ({ email, password, repeatedPassword, bookmarks }) => {
    validateEmail(email);
    validatePassword(password);
    validateRepeatPassword(repeatedPassword, password);
    setValues(oldValues => {
      return {...oldValues, bookmarks}
    })
  };
  //
  //
  const validation = (userData) => {
    if (!isSignup) {
      checkLogInInputs(userData);
    }
    if (isSignup) {
      checkSignUpInputs(userData);
    }
  };
  //
  //
  const loginValuesConfirmation = () => {
    if (!isSignup) {
      if (
        !emailError.isEmailError &&
        !passwordError.isPasswordError &&
        Object.entries(values).length >= 1
      ) {
        callBackSubmit("LOGIN", values);
      }
    }
  };
  //
  const signupValuesConfirmation = () => {
    if (isSignup) {
      if (
        !emailError.isEmailError &&
        !passwordError.isPasswordError &&
        !repeatPasswordError.isRepeatPasswordError &&
        Object.entries(values).length >= 1
      ) {
        callBackSubmit("SIGNUP", values);
      }
    }
  };
  //
  //
  useEffect(() => {
    signupValuesConfirmation();
    loginValuesConfirmation();
  }, [values, emailError, passwordError]);
  //
  //
  return { validation, emailError, passwordError, repeatPasswordError };
};

export default useValidation;

//*****************************************************************//
