import axios from "axios";
import { LOAD_DOCTORS_DATA, LOAD_USERS_DATA, LOAD_SPECIALIZATIONS_DATA } from "./types";

export const loadUsersData = () => async dispatch => {
  try {
    const res = await axios.get("/load-users");
    dispatch({
      type: LOAD_USERS_DATA,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const loadDoctorsData = () => async dispatch => {
  try {
    let res = await axios.get("/load-doctors");
    dispatch({
      type: LOAD_DOCTORS_DATA,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const loadSpecializationsData = () => async dispatch => {
  try {
    let result = await axios.get("/load-specializations");
    dispatch({
      type: LOAD_SPECIALIZATIONS_DATA,
      data: result.data
    });
  } catch (err) {
    console.error(err.message);
  }
};