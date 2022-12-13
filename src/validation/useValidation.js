import React, { useEffect } from "react";
import { useState } from "react";

const useValidation = (callBackSubmit) => {
  const [emailError, setEmailError] = useState({
    isEmailError: false,
    msg: "",
  });
  const [passwordError, setPasswordError] = useState({
    isPasswordError: false,
    msg: "",
  });
  const [values, setValues] = useState({});
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
  const validateRepeatPassword = () => {};
  //
  const checkLogInInputs = ({ email, password }) => {
    validateEmail(email);
    validatePassword(password);
  };
  useEffect(() => {
    if (
      !emailError.isEmailError &&
      !passwordError.isPasswordError &&
      Object.entries(values).length >= 1
    ) {
      callBackSubmit("LOGIN CONFIRMED",values);
    }
  }, [values, emailError, passwordError]);
  //
  const checkSignUpInputs = ({ email, password, repeatedPassword }) => {};
  //
  const validation = (formType, userData) => {
    console.log(formType, userData);
    if (formType === "LOGIN") {
      checkLogInInputs(userData);
    }
    if (formType === "SIGNUP") {
      checkSignUpInputs(userData);
    }
  };
  //
  return { validation, emailError, passwordError };
};

export default useValidation;

//*****************************************************************//
// WAS TRYING

// const useValidation = () => {
//   //
//   const [isSignUpErrors, setIsSignUpErrors] = useState({});
//   const [isLoginErrors, setIsLoginErrors] = useState({});
//   //
//   const checkLogInInputs = (userData) => {};
//   //
//   const checkSignUpInputs = (userData) => {};
//   //
//   const validation = (formType, userData) => {
//     console.log(formType, userData);
//     if (formType === "LOGIN") {
//       const { email, password } = userData;
//     }
//     if (formType === "SIGNUP") {
//       const { email, password, repeatedPassword } = userData;
//     }
//   };

//   return { validation };
// };

//************************************************************//

// ALSO TRYING

// const useValidation = (callBackSubmit) => {
//   // FORM VALUES
//   const [values, setValues] = useState({});
//   // FORM ERRORS
//   const [errors, setErrors] = useState({});

//   // VALIDATE INPUT VALUES
//   const validate = (e, value, name) => {
//     // CHECKING NAME ATTRIBUTE
//     switch (name) {
//       // VALID EMAIL INPUT
//       case "email":
//         if (
//           !new RegExp(
//             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//           ).test(value)
//         ) {
//           setErrors({
//             ...errors,
//             email: "Wrong format",
//           });
//         } else {
//           const newObj = errors;
//           delete newObj.email;
//           setErrors(newObj);
//         }
//         break;
//       // VALIDATE PASSWORD
//       case "password":
//         if (value.length <= 4) {
//           setErrors({
//             ...errors,
//             password: "Needs to be at least 4 characters",
//           });
//         } else {
//           const newObj = errors;
//           delete newObj.password;
//           setErrors(newObj);
//         }
//         break;
//       // CHECK REPEATING PASSWORD
//       case "repeat-password":
//         if (value.length <= 4 && value !== values?.password) {
//           setErrors({
//             ...errors,
//             repeatingPassword: "Needs to match password",
//           });
//         } else {
//           const newObj = errors;
//           delete newObj.repeatingPassword;
//         }
//         break;
//       //
//       default:
//         break;
//     }
//   };
//   //
//   const handleSubmit = (e) => {
//     if (e) e.preventDefault();
//     if (Object.keys(errors).length <= 0 && Object.keys(values).length >= 1) {
//       callBackSubmit();
//     }
//   };
//   //
//   const handleChange = (e) => {
//     e.preventDefault();
//     let name = e.target.name;
//     let value = e.target.value;
//     validate(e, value, name);
//     setValues({
//       ...values,
//       [name]: value,
//     });
//   };
//   //
//   return { values, errors, handleSubmit, handleChange };
// };
