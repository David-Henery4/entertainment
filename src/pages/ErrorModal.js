import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signoutUser, resetIsError } from "../features/content/contentSlice";

const ErrorModal = () => {
  const dispatch = useDispatch();
  //
  const handleBackToLogin = () => {
    dispatch(resetIsError())
    dispatch(signoutUser())
  };
  //
  return (
    <div className="grid place-items-center fixed top-0 left-0 w-full h-screen z-50 backdrop-filter backdrop-blur-2xl bg-greyishBlue bg-opacity-50">
      <div className="bg-semiDarkBlue px-6 py-8 rounded-md text-center flex flex-col justify-center items-center gap-4 w-11/12 max-w-[400px]">
        <h2 className="font-medium text-2xl">Sorry!</h2>
        <div className="text-base">
          <p>There has been a error :(</p>
          <p>Please try again</p>
        </div>
        <a href="/login" className="text-base text-red" onClick={handleBackToLogin}>
          Back to login
        </a>
      </div>
    </div>
  );
};

export default ErrorModal;
