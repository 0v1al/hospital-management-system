import { 
  LOAD_ADMIN,
  LOGIN_SUCCESS_ADMIN,
  LOGIN_FAIL_ADMIN,
  LOGOUT_ADMIN
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
    case LOAD_ADMIN:
      return {
        ...state,
        logged: true,
        loading: false,
        ...action.data,
        firstLogin: true
      }
    case LOGIN_SUCCESS_ADMIN:
      return {
        ...state,
        logged: true,
        loading: false
      };
    case LOGIN_FAIL_ADMIN:
    case LOGOUT_ADMIN:
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