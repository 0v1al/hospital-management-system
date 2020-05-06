import axios from "axios";
import { createAlert } from "./alert";
import { 
  ADD_MEDICAL_HISTORY,
  REMOVE_MEDICAL_HISTORY_DOCTOR, 
  REMOVE_MEDICAL_HISTORY_PATIENT,
  LOAD_MEDICAL_HISTORIES,
  LOAD_MEDICAL_HISTORIES_ERROR
} from "./types";

export const addMedicalHistory = (patientId, medicalHistory, doctorFirstname, doctorLastname) => async dispatch => {
  const { bloodPressure, bloodSugar, weight, prescription, bodyTemperature } = medicalHistory;
  const doctorFullname = `${doctorFirstname} ${doctorLastname}`;
  const body = JSON.stringify({ patientId, bloodPressure, bloodSugar, weight, prescription, bodyTemperature, doctorFullname });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  
  try {
    const res = await axios.post("http://localhost:5000/add-medical-history", body, config);
    dispatch({
      type: ADD_MEDICAL_HISTORY,
      data: res.data
    });
    dispatch(createAlert("the medical history was added", "success", 2000));
    return true;
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(createAlert(error.msg, "fail", 2000)));
    }

    console.error(err.message);
    return false;
  }
};

export const removeMedicalHistoryDoctor = medicalHistoryId => async dispatch => {
  try {
    const res = await axios.delete(`/remove-medical-history-doctor/${medicalHistoryId}`);
    dispatch({
      type: REMOVE_MEDICAL_HISTORY_DOCTOR,
      data: res.data
    });
    dispatch(createAlert("the medical history was removed", "success", 2000));
  } catch (err) {
    console.error(err.message);
  }
};

export const removeMedicalHistoryPatient = medicalHistoryId => async dispatch => {
  try {
    const res = await axios.delete(`/remove-medical-history-patient/${medicalHistoryId}`);
    dispatch({
      type: REMOVE_MEDICAL_HISTORY_PATIENT,
      data: res.data
    });
    dispatch(createAlert("the medical history was removed", "success", 2000));
  } catch (err) {
    console.error(err.message);
  }
};

export const loadMedicalHistoriesByPatientId = patientId => async dispatch => {
  try {
    const res = await axios.get(`/load-medical-histories-by-patientId/${patientId}`);
    dispatch({
      type: LOAD_MEDICAL_HISTORIES,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: LOAD_MEDICAL_HISTORIES_ERROR,
    });
  }
};

export const loadMedicalHistoriesByUserId = userId => async dispatch => {
  try {
    const res = await axios.get(`/load-medical-histories-by-userId/${userId}`);
    dispatch({
      type: LOAD_MEDICAL_HISTORIES,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: LOAD_MEDICAL_HISTORIES_ERROR,
    });
  }
};

export const loadAllMedicalHistories = () => async dispatch => {
  try {
    const res = await axios.get("/load-all-medical-histories");
    dispatch({
      type: LOAD_MEDICAL_HISTORIES,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: LOAD_MEDICAL_HISTORIES_ERROR,
    });
  }
};

export const loadMedicalHistory = patientId => async dispatch => {
  try {
    const res = await axios.get(`/load-medical-history/${patientId}`);
    dispatch({
      type: LOAD_MEDICAL_HISTORIES,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: LOAD_MEDICAL_HISTORIES_ERROR,
    });
  }
};