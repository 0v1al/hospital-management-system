import axios from "axios";
import { setCookie, getCookie, removeCookie } from "../cookie";
import { createAlert } from "./alert";
import { loadMedicalHistories } from "./medicalHistory";
import setAxiosHeader from "../setAxiosHeader";

import { 
  LOAD_DOCTOR, 
  LOGIN_SUCCESS_DOCTOR, 
  LOGIN_FAIL_DOCTOR,
  LOGOUT_DOCTOR,
  LOAD_PATIENTS,
  LOAD_PATIENT,
  UPDATE_PATIENT,
  REMOVE_PATIENT,
  SEARCH_PATIENT,
  UPDATE_PROFILE_DOCTOR
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

    console.error(err.message);
  }
};

export const addPatient = (doctorId, patient) => async dispatch => {
  try {
    const { firstname, lastname, email, contact, address, male, female, medicalHistory, age } = patient;
    const body = JSON.stringify({ firstname, lastname, email, contact, address, male, female, medicalHistory, age });
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.post(`http://localhost:5000/add-patient/${doctorId}`, body, config);
    dispatch(createAlert("The patient was added", "success", 2000));
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach(error => dispatch(createAlert(error.msg, "fail")));
    }

    console.error(err.message);
  }
};

export const loadPatients = doctorId => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:5000/load-patients/${doctorId}`);
    dispatch({
      type: LOAD_PATIENTS,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const loadPatient = patientId => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:5000/load-patient/${patientId}`);
    dispatch({
      type: LOAD_PATIENT,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const updatePatient = (oldPatientEmail, patientUpdate) => async dispatch => {
  const { firstname, lastname, email, contact, age, medicalHistory, male, female, address } = patientUpdate;
  const body = JSON.stringify({ firstname, lastname, email, contact, age, medicalHistory, male, female, address });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.put(`http://localhost:5000/update-patient/${oldPatientEmail}`, body, config);
    const result = { oldPatientEmail, newPatient: res.data };
    dispatch({
      type: UPDATE_PATIENT,
      data: result
    });
    dispatch(createAlert("The patient was updated", "success", 2000));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(createAlert(error.msg, "fail", 2000)));
    }

    console.error(err.message);
   }
};

export const removePatient = data => async dispatch => {
  const { patientId, doctorId } = data;
  try {
    await axios.delete(`http://localhost:5000/remove-patient/${patientId}/${doctorId}`);
    dispatch({
      type: REMOVE_PATIENT,
      data: patientId
    });
    dispatch(createAlert("The patient was removed", "success", 2000));
  } catch (err) {
    console.error(err.message);
  }
};

export const searchPatient = patientEmail => async dispatch => {
  try {
    const body = JSON.stringify({ patientEmail });
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.post(`http://localhost:5000/search-patient`, body, config);
    dispatch({
      type: SEARCH_PATIENT,
      data: res.data
    });
    dispatch(loadMedicalHistories(res.data._id));
    dispatch(createAlert("The patient was found", "success", 2000));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(createAlert(error.msg, "fail", 2000)));
    }

    console.error(err.message);
  }
};

export const changePassword = change => async dispatch => {
  const { email, password, newPassword, repeatNewPassword } = change;
  const body = JSON.stringify({ email, password, newPassword, repeatNewPassword });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    await axios.put("http://localhost:5000/change-password-doctor", body, config);
    dispatch(createAlert("Your password was changed with success", "success", 2000));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(createAlert(error.msg, "fail", 2000)));
    }

    console.error(err.message);
  }
};

export const updateProfile = updateProfile => async dispatch => {
  const { doctorEmail, firstname, lastname, address, consultationPrice, contact, email } = updateProfile;
  const body = JSON.stringify({ doctorEmail, firstname, lastname, address, consultationPrice, contact, email });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.put(`http://localhost:5000/update-profile-doctor/${doctorEmail}`, body, config);
    dispatch({
      type: UPDATE_PROFILE_DOCTOR,
      data: res.data
    });
    dispatch(createAlert("Your profile was updated with success", "success", 2000));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(createAlert(error.msg, "fail", 2000)));
    }

    console.error(err.message);
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
  axios.put(`http://localhost:5000/logout-doctor`, body, config);
  dispatch({
    type: LOGOUT_DOCTOR
  });
  history.push("/");
};