import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setLoggedIn,
  setTasksEmpty,
  setToken,
  setUser,
} from "../redux/managementReducer";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setToken({ token: null }));
    dispatch(setUser({ user: null }));
    dispatch(setTasksEmpty({ tasks: [] }));
    dispatch(setLoggedIn({ loggedIn: false }));
    navigate("/login");
  }, []);
  return <div></div>;
};

export default Logout;
