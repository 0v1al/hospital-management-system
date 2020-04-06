import axios from "axios";
import { setCookie, getCookie, removeCookie } from "../cookie";
import { createAlert } from "./alert";
import setAxiosHeader from "../setAxiosHeader";

import { 
  LOAD_ADMIN, 
  LOGIN_SUCCESS_ADMIN, 
  LOGIN_FAIL_ADMIN, 
  LOGOUT_ADMIN
} from "./types";

export const loadAdmin = () => async dispatch => {
  const token = getCookie("token");
  setAxiosHeader(token);
  try {
    const res = await axios.get("http://localhost:5000/load-admin");
    dispatch({
      type: LOAD_ADMIN,
      data: res.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const loginAdmin = (credentials, history) => async dispatch => {
  const { email, password } = credentials;
  const body = JSON.stringify({ email, password });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    let result = await axios.post("http://localhost:5000/login-admin", body, config);
    const token = result.data;
    setCookie("token", token, 1000 * 60 * 60);
    dispatch({
      type: LOGIN_SUCCESS_ADMIN
    });
    dispatch(createAlert("Logged successfully", "success", 1000));
    setTimeout(() => history.push("/admin-dashboard"), 1000);
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach(error => dispatch(createAlert(error.msg, "fail")));
    }

    dispatch({
      type: LOGIN_FAIL_ADMIN
    });
  }
};

export const logoutAdmin = history => dispatch => {
  removeCookie("token");
  dispatch({
    type: LOGOUT_ADMIN
  });
  history.push("/");
};