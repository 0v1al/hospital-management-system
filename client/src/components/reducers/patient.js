import { 
  LOAD_PATIENT,
  LOGIN_SUCCESS_PATIENT,
  LOGIN_FAIL_PATIENT
} from "../actions/types";

const initialState = {
  // token: null,
  logged: false,
  firstname: "",
  lastname: "",
  email: "",
  location: "",
  loading: true
};

export default function patient (state = initialState, action) {
  switch (action.type) {
    case LOAD_PATIENT:
      return {
        ...state,
        loading: false,
        ...action.data
      }
    case LOGIN_SUCCESS_PATIENT:
      return {
        ...state,
        logged: true,
        loading: false
      };
    case LOGIN_FAIL_PATIENT:
      return {
        ...state,
        logged: false,
        loading: true
      }
    default:
      return state;
  }
}