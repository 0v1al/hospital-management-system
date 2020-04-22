import { 
  LOAD_DOCTOR,
  LOGIN_SUCCESS_DOCTOR,
  LOGIN_FAIL_DOCTOR,
  LOGOUT_DOCTOR,
  UPDATE_PROFILE_DOCTOR
} from "../actions/types";

const initialState = {
  logged: false,
  firstname: "",
  lastname: "",
  email: "",
  loading: true,
  firstLogin: false,
  address: "",
  specialization: "",
  consultationPrice: "",
  contact: ""
};

export default function doctor (state = initialState, action) {
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
      };
      case UPDATE_PROFILE_DOCTOR:
        return {
          ...state,
          loading: false,
          firstname: action.data.firstname,
          lastname: action.data.lastname,
          email: action.data.email,
          address: action.data.address,
          consultationPrice: action.data.consultationPrice,
          contact: action.data.contact
        };
    default:
      return state;
  }
}