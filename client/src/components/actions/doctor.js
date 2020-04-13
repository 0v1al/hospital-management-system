import axios from "axios";
import { setCookie, getCookie, removeCookie } from "../cookie";
import { createAlert } from "./alert";
import setAxiosHeader from "../setAxiosHeader";

import { 
  LOAD_DOCTOR, 
  LOGIN_SUCCESS_DOCTOR, 
  LOGIN_FAIL_DOCTOR,
  LOGOUT_DOCTOR,
} from "./types";

export const loadDoctor = () => async dispatch => {
  const token = getCookie("token");
  setAxiosHeader(token);
  try {
    const res = await axios.get("http://localhost:5000/load-doctor");
    dispatch({
      type: LOAD_DOCTOR,
      data: res.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const loginDoctor = (credentials, history) => async dispatch => {
  const token = getCookie("token");
  setAxiosHeader(token);
  const { email, password } = credentials;
  const body = JSON.stringify({ email, password });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    let result = await axios.post("http://localhost:5000/login-doctor", body, config);
    const token = result.data;
    setCookie("token", token, 1000 * 60 * 60);
    dispatch({
      type: LOGIN_SUCCESS_DOCTOR
    });
    dispatch(createAlert("Logged successfully", "success", 1000));
    setTimeout(() => history.push("/doctor-dashboard"), 1000);
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach(error => dispatch(createAlert(error.msg, "fail")));
    }

    dispatch({
      type: LOGIN_FAIL_DOCTOR
    });
  }
};

export const logoutDoctor = (history, doctorEmail) => async dispatch => {
  removeCookie("token");
  setAxiosHeader(null);
  const body = JSON.stringify({ doctorEmail });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  axios.put(`http://localhost:5000/logout-doctor/${doctorEmail}`, body, config);
  dispatch({
    type: LOGOUT_DOCTOR
  });
  history.push("/");
};