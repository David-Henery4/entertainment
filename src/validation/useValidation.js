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
    if (initialPassword === "") {
      setPasswordError({
        isPasswordError: true,
        msg: "Can't be empty",
      });
    }
    if (initialPassword.length >= 1 && initialPassword.length < 4) {
      setPasswordError({
        isPasswordError: true,
        msg: "Needs to be at least 4 characters",
      });
    }
    if (initialPassword !== "" && initialPassword.length >= 4) {
      const password = initialPassword.trim();
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
    if (initialRepeatPassword === "") {
      setRepeatPasswordError({
        isRepeatPasswordError: true,
        msg: "Can't be empty",
      });
    }
    if (initialPassword !== initialRepeatPassword) {
      setRepeatPasswordError({
        isRepeatPasswordError: true,
        msg: "passwords need to match",
      });
    }
    if (
      initialRepeatPassword !== "" &&
      initialRepeatPassword.length >= 4 &&
      initialPassword === initialRepeatPassword
    ) {
      const repeatPassword = initialRepeatPassword.trim();
      setRepeatPasswordError({
        isRepeatPasswordError: false,
        msg: "",
      });
      setValues((oldValues) => {
        return { ...oldValues, repeatPassword };
      });
    }
  };
  //
  //
  const checkLogInInputs = ({ email, password }) => {
    validateEmail(email);
    validatePassword(password);
  };
  const checkSignUpInputs = ({ email, password, repeatedPassword }) => {
    validateEmail(email);
    validatePassword(password);
    validateRepeatPassword(repeatedPassword, password);
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
