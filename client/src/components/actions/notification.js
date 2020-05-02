import axios from "axios";

import {
  ADD_NOTIFICATION_DOCTOR,
  ADD_NOTIFICATION_USER,
  LOAD_NOTIFICATIONS_USER,
  LOAD_NOTIFICATIONS_DOCTOR,
  MARK_VIEW_NOTIFICATIONS_DOCTOR,
  MARK_VIEW_NOTIFICATIONS_USER
} from "./types";

export const addNotificationUser = (userId, message) => async dispatch => {
  const body = JSON.stringify({ userId, message });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post("/add-notification-user", body, config);
    dispatch({
      type: ADD_NOTIFICATION_USER,
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
    const res = await axios.post("/add-notification-doctor", body, config);
    dispatch({
      type: ADD_NOTIFICATION_DOCTOR,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const loadNotificationsUser = userId => async dispatch => {
  try {
    const res = await axios.get(`/load-notifications-user/${userId}`);
    dispatch({
      type: LOAD_NOTIFICATIONS_USER,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const loadNotificationsDoctor = doctorId => async dispatch => {
  try {
    const res = await axios.get(`/load-notifications-doctor/${doctorId}`);
    dispatch({
      type: LOAD_NOTIFICATIONS_DOCTOR,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const markViewNotificationsUser = userId => async dispatch => {
  const body = JSON.stringify({ userId });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.put("/mark-view-notifications-user", body, config);
    dispatch({
      type: MARK_VIEW_NOTIFICATIONS_USER,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const markViewNotificationsDoctor = doctorId => async dispatch => {
  const body = JSON.stringify({ doctorId });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.put("/mark-view-notifications-doctor", body, config);
    dispatch({
      type: MARK_VIEW_NOTIFICATIONS_DOCTOR,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const deleteNotificationsUser = userId => async dispatch => {
  try {
    const res = await axios.delete(`/delete-notifications-user/${userId}`);
    dispatch({
      type: LOAD_NOTIFICATIONS_USER,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const deleteNotificationsDoctor = doctorId => async dispatch => {
  try {
    const res = await axios.delete(`/delete-notifications-doctor/${doctorId}`);
    dispatch({
      type: LOAD_NOTIFICATIONS_DOCTOR,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const addNotificationDoctorByEmail = (doctorEmail, message) => async dispatch => {
  const body = JSON.stringify({ doctorEmail, message });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post("/add-notification-doctor-by-email", body, config);
    dispatch({
      type: ADD_NOTIFICATION_DOCTOR,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};
