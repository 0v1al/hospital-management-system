import { 
  LOAD_ADMIN,
  LOGIN_SUCCESS_ADMIN,
  LOGIN_FAIL_ADMIN,
  LOGOUT_ADMIN,
  LOAD_DOCTORS,
  REMOVE_DOCTOR,
  LOAD_USERS,
  REMOVE_USER,
  LOAD_ENTITY_NUMBER
} from "../actions/types";

const initialState = {
  logged: false,
  firstname: "",
  lastname: "",
  email: "",
  location: "",
  loading: true,
  firstLogin: false,
  doctors: [],
  users: [],
  entityNumber: null
};

export default function admin(state = initialState, action) {
  switch (action.type) {
    case LOAD_ADMIN:
      return {
        ...state,
        logged: true,
        loading: false,
        ...action.data,
        firstLogin: true
      };
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
      };
    case LOAD_DOCTORS: 
      return {
        ...state,
        loading: false,
        doctors: [ ...action.data ]
      };
    case LOAD_USERS:
      return {
        ...state,
        loading: false,
        users: [ ...action.data ]
      };
    case REMOVE_DOCTOR:
      return {
        ...state,
        loading: false,
        doctors: state.doctors.filter(doctor => doctor.email !== action.data)
      };
    case REMOVE_USER:
      return {
        ...state,
        loading: false,
        users: state.users.filter(user => user.email !== action.data)
      };
    case LOAD_ENTITY_NUMBER:
      return {
        ...state,
        loading: false,
        entityNumber: action.data
      }
    default:
      return state;
  }
}