import { combineReducers } from "redux";
import alert from "./alert";
import patient from "./patient";

export default combineReducers({
  alert,
  patient
});