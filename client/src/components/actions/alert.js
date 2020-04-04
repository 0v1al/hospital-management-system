import { ADD_ALERT, REMOVE_ALERT } from "./types";
import { v4 as uuidv4 } from "uuid";

export const createAlert = (msg, type, time = 2000) => dispatch => {
  const id = uuidv4();
  const alertInfo = { msg, type, id };
  dispatch({
    type: ADD_ALERT,
    data: alertInfo
  });
  setTimeout(() =>
    dispatch({
      type: REMOVE_ALERT,
      data: alertInfo
    }), time);
};