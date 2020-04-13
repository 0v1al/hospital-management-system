import axios from "axios";
import { createAlert } from "./alert";
import { ADD_MESSAGE, REMOVE_MESSAGE, LOAD_MESSAGES, UPDATE_MESSAGE, MARK_READ_MESSAGE } from "./types";

export const addMessage = messageInfo => async dispatch => {
    const { name, email, contact, message } = messageInfo;
    const body = JSON.stringify({ name, email, contact, message });
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
      const res = await axios.post("http://localhost:5000/contact-add-message", body, config);
      dispatch({
        type: ADD_MESSAGE,
        data: res.data
      });
      dispatch(createAlert("The message was sended", "success", 2000));
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

export const removeMessage = messageId => async dispatch => {
  try {
    await axios.delete(`http://localhost:5000/remove-message/${messageId}`);
    dispatch({
      type: REMOVE_MESSAGE,
      data: messageId
    });
    dispatch(createAlert("The message was removed", "success", 2000));
  } catch (err) {
    console.error(err.message);
  }
};

export const loadMessages = () => async dispatch => {
  try {
    const res = await axios.get("http://localhost:5000/load-messages"); 
    dispatch({
      type: LOAD_MESSAGES,
      data: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const updateMessage = (messageId, updateMessage) => async dispatch => {
  const { response } = updateMessage;
  const body = JSON.stringify({ response });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  try {
    const res = await axios.put(`http://localhost:5000/update-message/${messageId}`, body, config);
    dispatch({
      type: UPDATE_MESSAGE,
      data: res.data
    });
    dispatch(createAlert("The message was updated", "success", 2000));
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

export const markAsReadMessage = messageId => async dispatch => {
  const body = JSON.stringify({ messageId });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  try {
    const res = await axios.put(`http://localhost:5000/mark-read-message/${messageId}`, body, config);
    dispatch({
      type: MARK_READ_MESSAGE,
      data: res.data
    });
    dispatch(createAlert("The message was marked as read", "success", 2000));
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