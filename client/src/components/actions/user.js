import axios from "axios";
import { setCookie, getCookie, removeCookie } from "../cookie";
import { createAlert } from "./alert";
import setAxiosHeader from "../setAxiosHeader";

import { 
  LOAD_USER, 
  LOGIN_SUCCESS_USER, 
  LOGIN_FAIL_USER, 
  LOGOUT_USER,
  ADD_APPOINTMENT_CONSULTATION,
  REMOVE_APPOINTMENT_CONSULTATION,
  CANCEL_APPOINTMENT_CONSULTATION,
  LOAD_APPOINTMENT_CONSULTATIONS
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

export const addAppointmentConsultation = consultation => async dispatch => {
  const { userEmail, doctorEmail, consultationDate, consultationTime, doctorSelect, specializationSelect } = consultation;
  const body = JSON.stringify({ userEmail, doctorEmail, consultationDate, consultationTime, doctorSelect, specializationSelect });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post("http://localhost:5000/add-appointment-consultation", body, config);
    dispatch({
      type: ADD_APPOINTMENT_CONSULTATION,
      data: res.data
    });
    dispatch(createAlert("Consultation was scheduled and sended to the doctor", "success", 2000));
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach(error => dispatch(createAlert(error.msg, "fail")));
    }

    console.error(err.message);
  }
};

export const loadUserAppointmentConsultations = userEmail => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:5000/load-user-appointment-consultations/${userEmail}`);
    dispatch({
      type: LOAD_APPOINTMENT_CONSULTATIONS,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const loadDoctorAppointmentConsultations = doctorEmail => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:5000/load-doctor-appointment-consultations/${doctorEmail}`);
    dispatch({
      type: LOAD_APPOINTMENT_CONSULTATIONS,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const logoutUser = (history, userEmail) => async dispatch => {
  removeCookie("token");
  setAxiosHeader(null);
  const body = JSON.stringify({ userEmail });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  axios.put(`http://localhost:5000/logout-user/${userEmail}`, body, config);
  dispatch({
    type: LOGOUT_USER
  });
  history.push("/");
};