import axios from "axios";
import { setCookie, getCookie, removeCookie } from "../cookie";
import { createAlert } from "./alert";
import setAxiosHeader from "../setAxiosHeader";

import { 
  LOAD_ADMIN, 
  LOGIN_SUCCESS_ADMIN, 
  LOGIN_FAIL_ADMIN, 
  LOGOUT_ADMIN,
  ADD_SPECIALIZATION,
  LOAD_SPECIALIZATIONS,
  REMOVE_SPECIALIZATION,
  EDIT_SPECIALIZATION,
  LOAD_DOCTORS,
  REMOVE_DOCTOR,
  UPDATE_DOCTOR,
  LOAD_USERS,
  REMOVE_USER,
  PATIENT_REPORTS,
  LOAD_ENTITY_NUMBER
} from "./types";

export const loadAdmin = () => async dispatch => {
  const token = getCookie("tokenAdmin");
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
  const token = getCookie("tokenAdmin");
  setAxiosHeader(token);
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
    setCookie("tokenAdmin", token, 1000 * 60 * 60);
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

    console.error(err);
  }
};

export const addSpecialization = specialization => async dispatch => {
  const body = JSON.stringify({ specialization });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    let result = await axios.post("http://localhost:5000/add-specialization", body, config);
    dispatch({
      type: ADD_SPECIALIZATION,
      data: result.data
    });
    dispatch(createAlert("Specialization added", "success", 2000));
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach(error => dispatch(createAlert(error.msg, "fail")));
    }

    console.error(err);
  }
};

export const removeSpecialization = specializationName => async dispatch => {
  try {
    await axios.delete(`http://localhost:5000/remove-specialization/${specializationName}`);
    dispatch({
      type: REMOVE_SPECIALIZATION,
      data: specializationName.toLowerCase()
    });
    dispatch(createAlert("The specialization was removed", "success", 2000));
  } catch (err) {
    console.error(err.message);
  }
};

export const editSpecialization = (specialization, newSpecialization) => async dispatch => {
  const body = JSON.stringify({ specialization, newSpecialization });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    let newSpecialization =  await axios.put("http://localhost:5000/edit-specialization", body, config);
    const result = { specialization, newSpecialization: newSpecialization.data }
    dispatch({
      type: EDIT_SPECIALIZATION,
      data: result
    });
    dispatch(createAlert("The specialization was edited", "success", 2000));
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach(error => dispatch(createAlert(error.msg, "fail")));
    }

    console.error(err.message);
  }
}

export const loadSpecializations = () => async dispatch => {
  try {
    let result = await axios.get("http://localhost:5000/load-specializations");
    dispatch({
      type: LOAD_SPECIALIZATIONS,
      data: result.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const addDoctor = doctorData => async dispatch => {
  const { firstname, lastname, email, address, contact, password, specialization, consultationPrice } = doctorData;
  const body = JSON.stringify({ firstname, lastname, email, address, contact, password, specialization, consultationPrice });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    let res = await axios.post("http://localhost:5000/add-doctor", body, config);
    
    if (res) {
      dispatch(createAlert("The doctor account was created", "success", 2000));
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(createAlert(error.msg, "fail")));
    }

    console.error(err.message);
  }
};

export const loadDoctors = () => async dispatch => {
  try {
    let res = await axios.get("http://localhost:5000/load-doctors");
    dispatch({
      type: LOAD_DOCTORS,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
}

export const removeDoctor = doctorEmail => async dispatch => {
  try {
    await axios.delete(`http://localhost:5000/remove-doctor/${doctorEmail}`);
    dispatch({
      type: REMOVE_DOCTOR,
      data: doctorEmail
    });
    dispatch(createAlert("Doctor account was removed!", "success", 2000));
  } catch (err) {
    console.error(err.message);
  }
}

export const updateDoctor = (doctorUpdate) => async dispatch => {
  const body = JSON.stringify({ ...doctorUpdate });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    let newDoc =  await axios.put("http://localhost:5000/update-doctor", body, config);
    const result = { doctorEmail: doctorUpdate.doctorEmail, newDoctor: newDoc.data };
    dispatch({
      type: UPDATE_DOCTOR,
      data: result
    });
    dispatch(createAlert("The doctor account was updated", "success", 2000));
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach(error => dispatch(createAlert(error.msg, "fail")));
    }

    console.error(err.message);
  }
}

export const loadUsers = () => async dispatch => {
  try {
    const res = await axios.get("http://localhost:5000/load-users");
    dispatch({
      type: LOAD_USERS,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
}

export const removeUser = userEmail => async dispatch => {
  try {
    await axios.delete(`http://localhost:5000/remove-user/${userEmail}`);
    dispatch({
      type: REMOVE_USER,
      data: userEmail
    });
    dispatch(createAlert("User account was removed!", "success", 2000));
  } catch (err) {
    console.error(err.message);
  }
}

export const changePassword = change => async dispatch => {
  const { email, password, newPassword, repeatNewPassword } = change;
  const body = JSON.stringify({ email, password, newPassword, repeatNewPassword });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    await axios.put("http://localhost:5000/change-password-admin", body, config);
    dispatch(createAlert("Your password was changed with success", "success", 2000));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(createAlert(error.msg, "fail", 2000)));
    }

    console.error(err.message);
  }
};

export const patientReports = (fromDate, toDate) => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:5000/patient-reports/${fromDate}/${toDate}`);
    dispatch({
      type: PATIENT_REPORTS,
      data: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach(error => dispatch(createAlert(error.msg, "fail")));
    }

    console.error(err.message);
  }
}

export const loadEntityNumber = () => async dispatch => {
  try {
    const res = await axios.get("http://localhost:5000/load-entity-number");
    dispatch({
      type: LOAD_ENTITY_NUMBER,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
}

export const logoutAdmin = history => dispatch => {
  removeCookie("tokenAdmin");
  setAxiosHeader(null);
  dispatch({
    type: LOGOUT_ADMIN
  });
  history.push("/");
};