import React from 'react'
import { useDispatch } from "react-redux";
import { signoutUser } from "../features/content/contentSlice";

const Signout = ({ signoutActiveStyles }) => {
  const dispatch = useDispatch();
  return (
    <div className={signoutActiveStyles()} onClick={() => dispatch(signoutUser())}>
      Signout
    </div>
  );
};

export default Signout