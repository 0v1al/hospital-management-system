import { combineReducers } from "redux";
import alert from "./alert";
import patient from "./patient";
import doctor from "./doctor";
import admin from "./admin";
export default combineReducers({
  alert,
  patient,
  doctor,
  admin
});