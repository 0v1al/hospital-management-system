import { 
  LOAD_USER,
  LOGIN_SUCCESS_USER,
  LOGIN_FAIL_USER,
  LOGOUT_USER,
  UPDATE_PROFILE_USER
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
    case UPDATE_PROFILE_USER:
      return {
        ...state,
        loading: false,
        firstname: action.data.firstname,
        lastname: action.data.lastname,
        location: action.data.location,
        email: action.data.email
      }
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