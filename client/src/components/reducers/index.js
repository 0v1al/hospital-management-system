import { combineReducers } from "redux";
import alert from "./alert";
import patient from "./patient";
import doctor from "./doctor";
import admin from "./admin";
import specialization from "./specialization";

export default combineReducers({
  alert,
  patient,
  doctor,
  admin,
  specialization
});