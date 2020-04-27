import axios from "axios";

import {
  ADD_NOTIFICATION_DOCTOR,
  ADD_NOTIFICATION_PATIENT,
  LOAD_NOTIFICATIONS_PATIENT,
  LOAD_NOTIFICATIONS_DOCTOR,
  DELETE_NOTIFICATION_DOCTOR,
  DELETE_NOTIFICATION_PATIENT,
  MARK_VIEW_NOTIFICATION_DOCTOR,
  MARK_VIEW_NOTIFICATION_PATIENT
} from "./types";

export const addNotificationPatient = (patientId, message) => async dispatch => {
  const body = JSON.stringify({ patientId, message });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post("http://localhost:5000/add-notification-patient", body, config);
    dispatch({
      type: ADD_NOTIFICATION_PATIENT,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const addNotificationDoctor = (doctorId, message) => async dispatch => {
  const body = JSON.stringify({ doctorId, message });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post("http://localhost:5000/add-notification-doctor", body, config);
    dispatch({
      type: ADD_NOTIFICATION_DOCTOR,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const loadNotificationsPatient = patientId => async dispatch => {
  try {
    const res = await axios.get(`http:/localhost:5000/load-notifications-patient/${patientId}`);
    dispatch({
      type: LOAD_NOTIFICATIONS_PATIENT,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const loadNotificationsDoctor = doctorId => async dispatch => {
  try {
    const res = await axios.get(`http:/localhost:5000/load-notifications-doctor/${doctorId}`);
    dispatch({
      type: LOAD_NOTIFICATIONS_DOCTOR,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const deleteNotificationPatient = notificationId => async dispatch => {
  try {
    const res = await axios.delete(`http:/localhost:5000/delete-notification-patient/${notificationId}`);
    dispatch({
      type: DELETE_NOTIFICATION_PATIENT,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const deleteNotificationDoctor = notificationId => async dispatch => {
  try {
    const res = await axios.delete(`http:/localhost:5000/delete-notification-doctor/${notificationId}`);
    dispatch({
      type: DELETE_NOTIFICATION_DOCTOR,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const markViewNotificationPatient = notificationId => async dispatch => {
  const body = JSON.stringify({ notificationId });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.put("http://localhost:5000/mark-view-notification-patient", body, config);
    dispatch({
      type: MARK_VIEW_NOTIFICATION_PATIENT,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const markViewNotificationDoctor = notificationId => async dispatch => {
  const body = JSON.stringify({ notificationId });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.put("http://localhost:5000/mark-view-notification-doctor", body, config);
    dispatch({
      type: MARK_VIEW_NOTIFICATION_DOCTOR,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const deleteNotificationsPatient = patientId => async dispatch => {
  try {
    await axios.delete(`http://localhost:5000/delete-notifications-patient/${patientId}`);
  } catch (err) {
    console.error(err.message);
  }
};

export const deleteNotificationsDoctor = doctorId => async dispatch => {
  try {
    await axios.delete(`http://localhost:5000/delete-notifications-doctor/${doctorId}`);
  } catch (err) {
    console.error(err.message);
  }
};
