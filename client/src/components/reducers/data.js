import { LOAD_USERS_DATA, LOAD_DOCTORS_DATA, LOAD_SPECIALIZATIONS_DATA } from "../actions/types";

const initialState = {
  loading: true,
  users: [],
  doctors: [],
  specializations: [],
  patients: []
};

export default function data(state = initialState, action) {
  switch (action.type) {
    case LOAD_USERS_DATA:
      return {
        ...state,
        loading: false,
        users: [ ...action.data ]
      };
    case LOAD_DOCTORS_DATA: 
      return {
        ...state,
        loading: false,
        doctors: [ ...action.data ]
      };
    case LOAD_SPECIALIZATIONS_DATA:
      return {
        ...state,
        loading: false,
        specializations: [ ...action.data ]
      };
    default:
      return state;
  }
}