import React from "react";
import { useState } from "react";

const useValidation = (callBackSubmit) => {
  // FORM VALUES
  const [values, setValues] = useState({});
  // FORM ERRORS
  const [errors, setErrors] = useState({});

  // VALIDATE INPUT VALUES
  const validate = (e, value, name) => {
    // CHECKING NAME ATTRIBUTE
    switch (name) {
      // VALID EMAIL INPUT
      case "email":
        if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value)
        ) {
          setErrors({
            ...errors,
            email: "Wrong format",
          });
        } else {
          const newObj = errors;
          delete newObj.email;
          setErrors(newObj);
        }
        break;
      // VALIDATE PASSWORD
      case "password":
        if (value.length <= 4) {
          setErrors({
            ...errors,
            password: "Needs to be at least 4 characters",
          });
        } else {
          const newObj = errors;
          delete newObj.password;
          setErrors(newObj);
        }
        break;
      // CHECK REPEATING PASSWORD
      case "repeat-password":
        if (value.length <= 4 && value !== values?.password) {
          setErrors({
            ...errors,
            repeatingPassword: "Needs to match password"
          })
        } else {
          const newObj = errors
          delete newObj.repeatingPassword
        }
        break;
      //
      default:
        break;
    }
  };
  //
  const handleSubmit = (e) => {
    if(e) e.preventDefault();
    if (Object.keys(errors).length <= 0 && Object.keys(values).length >= 1){
      callBackSubmit()
    }
  }
  //
  const handleChange = (e) => {
    e.preventDefault()
    let name = e.target.name;
    let value = e.target.value;
    validate(e,value, name)
    setValues({
      ...values,
      [name]: value
    })
  }
  //
  return {values,errors,handleSubmit,handleChange};
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
