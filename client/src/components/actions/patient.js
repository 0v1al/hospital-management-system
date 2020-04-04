import axios from "axios";
import { setCookie, getCookie } from "../cookie";
import { createAlert } from "./alert";
import setAxiosHeader from "../setAxiosHeader";

import { 
  LOAD_PATIENT, 
  LOGIN_SUCCESS_PATIENT, 
  LOGIN_FAIL_PATIENT, 
  REGISTER_FAIL_PATIENT, 
  REGISTER_SUCCESS_PATIENT
} from "./types";

export const loadPatient = () => async dispatch => {
  const token = getCookie("token");
  setAxiosHeader(token);
  try {
    const res = await axios.get("http://localhost:5000/load-patient");
    dispatch({
      type: LOAD_PATIENT,
      data: res.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const registerPatient = (credentials, history) => async dispatch => {
  const { firstname, lastname, location, email, password, passwordRepeat } = credentials;
  const body = JSON.stringify({ firstname, lastname, location,  email, password, passwordRepeat });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    let result = await axios.post("http://localhost:5000/register-patient", body, config);
    dispatch(createAlert("The account was created", "success", 2000));
    setTimeout(() => history.push("/login-patient"), 3000);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(createAlert(error.msg, "fail")));
    }
    console.error(err);
  }
};

export const loginPatient = (credentials, history) => async dispatch => {
  const { email, password } = credentials;
  const body = JSON.stringify({ email, password });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    let result = await axios.post("http://localhost:5000/login-patient", body, config);
    const token = result.data;
    setCookie("token", token, 1000 * 60 * 60);
    dispatch({
      type: LOGIN_SUCCESS_PATIENT
    });
    dispatch(createAlert("Logged successfully", "success", 1000));
    setTimeout(() => history.push("/patient-dashboard"), 2000);
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach(error => dispatch(createAlert(error.msg, "fail")));
    }

  }
};