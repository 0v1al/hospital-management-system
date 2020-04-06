import { 
  LOAD_PATIENT,
  LOGIN_SUCCESS_PATIENT,
  LOGIN_FAIL_PATIENT,
  LOGOUT_PATIENT
} from "../actions/types";

const initialState = {
  logged: false,
  firstname: "",
  lastname: "",
  email: "",
  location: "",
  loading: true,
  firstLogin: false
};

export default function patient (state = initialState, action) {
  switch (action.type) {
    case LOAD_PATIENT:
      return {
        ...state,
        logged: true,
        loading: false,
        firstLogin: true,
        ...action.data
      }
    case LOGIN_SUCCESS_PATIENT:
      return {
        ...state,
        logged: true,
        loading: false
      };
    case LOGIN_FAIL_PATIENT:
    case LOGOUT_PATIENT:
      return {
        ...state,
        logged: false,
        firstname: "",
        lastname: "",
        email: "",
        location: "",
        loading: true,
        firstLogin: false
      }
    default:
      return state;
  }
}