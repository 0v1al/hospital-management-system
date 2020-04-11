import axios from "axios";
import { setCookie, getCookie, removeCookie } from "../cookie";
import { createAlert } from "./alert";
import setAxiosHeader from "../setAxiosHeader";

import { 
  LOAD_USER, 
  LOGIN_SUCCESS_USER, 
  LOGIN_FAIL_USER, 
  LOGOUT_USER
} from "./types";

export const loadUser = () => async dispatch => {
  const token = getCookie("token");
  setAxiosHeader(token);
  try {
    const res = await axios.get("http://localhost:5000/load-user");
    dispatch({
      type: LOAD_USER,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const registerUser = (credentials, history) => async dispatch => {
  const { firstname, lastname, location, email, password, passwordRepeat } = credentials;
  const body = JSON.stringify({ firstname, lastname, location,  email, password, passwordRepeat });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    await axios.post("http://localhost:5000/register-user", body, config);
    dispatch(createAlert("The account was created", "success", 1000));
    setTimeout(() => history.push("/login-user"), 1000);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(createAlert(error.msg, "fail")));
    }
    console.error(err.message);
  }
};

export const loginUser = (credentials, history) => async dispatch => {
  const { email, password } = credentials;
  const body = JSON.stringify({ email, password });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    let result = await axios.post("http://localhost:5000/login-user", body, config);
    const token = result.data;
    setCookie("token", token, 1000 * 60 * 60);
    dispatch({
      type: LOGIN_SUCCESS_USER
    });
    dispatch(createAlert("Logged successfully", "success", 1000));
    setTimeout(() => history.push("/user-dashboard"), 2000);
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach(error => dispatch(createAlert(error.msg, "fail")));
    }

    dispatch({
      type: LOGIN_FAIL_USER
    });

    console.error(err.message);
  }
};

export const logoutUser = history => dispatch => {
  removeCookie("token");
  dispatch({
    type: LOGOUT_USER
  });
  history.push("/");
};