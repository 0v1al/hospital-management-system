import { combineReducers } from "redux";
import alert from "./alert";
import user from "./user";
import doctor from "./doctor";
import admin from "./admin";
import specialization from "./specialization";
import message from "./message";
import data from "./data";
import consultation from "./consultation";

export default combineReducers({
  alert,
  user,
  doctor,
  admin,
  specialization,
  message,
  data,
  consultation
});