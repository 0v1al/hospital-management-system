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
  LOAD_APPOINTMENT_CONSULTATIONS,
  CANCEL_APPOINTMENT_CONSULTATION_DOCTOR,
  FINISH_APPOINTMENT_CONSULTATION,
  UPDATE_PROFILE_USER,
  ACCEPT_APPOINTMENT_CONSULTATION_DOCTOR
} from "./types";

export const loadUser = () => async dispatch => {
  const token = getCookie("tokenUser");
  setAxiosHeader(token);
  try {
    const res = await axios.get("/load-user");
    dispatch({
      type: LOAD_USER,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const registerUser = (credentials, history) => async dispatch => {
  const { firstname, lastname, location, email, password, passwordRepeat, male, female } = credentials;
  const body = JSON.stringify({ firstname, lastname, location,  email, password, passwordRepeat, male, female });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    await axios.post("/register-user", body, config);
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
  const token = getCookie("tokenUser");
  setAxiosHeader(token);
  const { email, password } = credentials;
  const body = JSON.stringify({ email, password });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    let result = await axios.post("/login-user", body, config);
    const token = result.data;
    setCookie("tokenUser", token, 1000 * 60 * 60 * 3);
    dispatch({
      type: LOGIN_SUCCESS_USER
    });
    dispatch(createAlert("Logged successfully", "success", 1000));
    setTimeout(() => history.push("/user-dashboard"), 1000);
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
    const res = await axios.post("/add-appointment-consultation", body, config);
    dispatch({
      type: ADD_APPOINTMENT_CONSULTATION,
      data: res.data
    });
    dispatch(createAlert("Consultation was scheduled and sended to the doctor", "success", 2000));
    return true;
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach(error => dispatch(createAlert(error.msg, "fail")));
    }

    console.error(err.message);
    return false;
  }
};

export const loadUserAppointmentConsultations = userEmail => async dispatch => {
  try {
    const res = await axios.get(`/load-user-appointment-consultations/${userEmail}`);
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
    const res = await axios.get(`/load-doctor-appointment-consultations/${doctorEmail}`);
    dispatch({
      type: LOAD_APPOINTMENT_CONSULTATIONS,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const loadAllAppointmentConsultations = () => async dispatch => {
  try {
    const res = await axios.get("/load-all-appointment-consultations");
    dispatch({
      type: LOAD_APPOINTMENT_CONSULTATIONS,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const removeAppointmentConsultation = consultationId => async dispatch => {
  try {
    const res = await axios.delete(`/remove-appointment-consultation/${consultationId}`);
    dispatch({
      type: REMOVE_APPOINTMENT_CONSULTATION,
      data: res.data._id
    });
    dispatch(createAlert("The consultation was removed", "success", 2000));
  } catch (err) {
    console.error(err.message);
  }
};

export const cancelAppointmentConsultation = consultationId => async dispatch => {
  try {
    const res = await axios.put(`/cancel-appointment-consultation/${consultationId}`);
    dispatch({
      type: CANCEL_APPOINTMENT_CONSULTATION,
      data: res.data._id
    });
    dispatch(createAlert("The consultation was canceled", "success", 2000));
    return true;
  } catch (err) {
    console.error(err.message);
    return false;
  }
};

export const cancelAppointmentConsultationDoctor = consultationId => async dispatch => {
  try {
    const res = await axios.put(`/cancel-appointment-consultation-doctor/${consultationId}`);
    dispatch({
      type: CANCEL_APPOINTMENT_CONSULTATION_DOCTOR,
      data: res.data._id
    });
    dispatch(createAlert("The consultation was canceled", "success", 2000));
    return true;
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach(error => dispatch(createAlert(error.msg, "fail")));
    }

    console.error(err.message);
    return false;
  }
};

export const acceptAppointmentConsultationDoctor = consultationId => async dispatch => {
  try {
    const res = await axios.put(`/accept-appointment-consultation-doctor/${consultationId}`);
    dispatch({
      type: ACCEPT_APPOINTMENT_CONSULTATION_DOCTOR,
      data: res.data._id
    });
    dispatch(createAlert("The consultation was accepted", "success", 2000));
    return true;
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach(error => dispatch(createAlert(error.msg, "fail")));
    }

    console.error(err.message);
    return false;
  }
};

export const finishAppointmentConsultationDoctor = consultationId => async dispatch => {
  try {
    const res = await axios.put(`/finish-appointment-consultation/${consultationId}`);
    dispatch({
      type: FINISH_APPOINTMENT_CONSULTATION,
      data: res.data._id
    });
    dispatch(createAlert("The consultation was finished", "success", 2000));
    return true;
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach(error => dispatch(createAlert(error.msg, "fail")));
    }

    console.error(err.message);
    return false;
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
    await axios.put("/change-password-user", body, config);
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
  const { userEmail, firstname, lastname, email, location } = updateProfile;
  const body = JSON.stringify({ userEmail, firstname, lastname, email, location });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.put(`/update-profile-user/${userEmail}`, body, config);
    dispatch({
      type: UPDATE_PROFILE_USER,
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

export const logoutUser = (history, userEmail) => async dispatch => {
  removeCookie("tokenUser");
  setAxiosHeader(null);
  await axios.put(`/logout-user/${userEmail}`);
  dispatch({
    type: LOGOUT_USER
  });
  history.push("/");
};