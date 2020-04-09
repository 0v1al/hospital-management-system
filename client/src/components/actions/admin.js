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
  EDIT_SPECIALIZATION
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
    })
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
    console.log(result);
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

export const logoutAdmin = history => dispatch => {
  removeCookie("token");
  dispatch({
    type: LOGOUT_ADMIN
  });
  history.push("/");
};