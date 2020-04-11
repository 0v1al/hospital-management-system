import { 
  LOAD_USER,
  LOGIN_SUCCESS_USER,
  LOGIN_FAIL_USER,
  LOGOUT_USER
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

export default function user (state = initialState, action) {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        logged: true,
        loading: false,
        firstLogin: true,
        ...action.data
      }
    case LOGIN_SUCCESS_USER:
      return {
        ...state,
        logged: true,
        loading: false
      };
    case LOGIN_FAIL_USER:
    case LOGOUT_USER:
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