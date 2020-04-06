import { 
  LOAD_DOCTOR,
  LOGIN_SUCCESS_DOCTOR,
  LOGIN_FAIL_DOCTOR,
  LOGOUT_DOCTOR
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
    case LOAD_DOCTOR:
      return {
        ...state,
        logged: true,
        loading: false,
        firstLogin: true,
        ...action.data
      }
    case LOGIN_SUCCESS_DOCTOR:
      return {
        ...state,
        logged: true,
        loading: false
      };
    case LOGIN_FAIL_DOCTOR:
    case LOGOUT_DOCTOR:
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