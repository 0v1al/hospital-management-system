import { ADD_APPOINTMENT_CONSULTATION, REMOVE_APPOINTMENT_CONSULTATION, LOAD_APPOINTMENT_CONSULTATIONS  } from "../actions/types";

const initialState = {
  loading: true,
  consultations: []
};

export default function appointment(state = initialState, action) {
  switch (action.type) {
    case ADD_APPOINTMENT_CONSULTATION:
      return {
        ...state,
        loading: false,
        consultations: [ ...state.consultations, action.data ]
      };
    case REMOVE_APPOINTMENT_CONSULTATION:
      return {
        ...state,
        loading: false,
        consultations: state.consultations.filter(consultation => consultation._id !== action.data)
      };
    case LOAD_APPOINTMENT_CONSULTATIONS:
      return {
        ...state,
        loading: false,
        consultation: [ ...action.data ]
      }
    default:
      return state;
  }
}