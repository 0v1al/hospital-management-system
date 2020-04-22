import { 
  ADD_APPOINTMENT_CONSULTATION, 
  REMOVE_APPOINTMENT_CONSULTATION, 
  LOAD_APPOINTMENT_CONSULTATIONS, 
  CANCEL_APPOINTMENT_CONSULTATION, 
  CANCEL_APPOINTMENT_CONSULTATION_DOCTOR,
  FINISH_APPOINTMENT_CONSULTATION
} from "../actions/types";

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
        consultations: [ ...action.data ]
      };
    case CANCEL_APPOINTMENT_CONSULTATION:
      return {
        ...state,
        loading: false,
        consultations: state.consultations.map(consultation => {
          if (consultation._id === action.data) {
            consultation.canceled = true;
            consultation.active = false;
          }
          return consultation;
        })
      };
      case CANCEL_APPOINTMENT_CONSULTATION_DOCTOR:
        return {
          ...state,
          loading: false,
          consultations: state.consultations.map(consultation => {
            if (consultation._id === action.data) {
              consultation.canceledByDoctor = true;
              consultation.active = false;
            }
            return consultation;
          })
        };
      case FINISH_APPOINTMENT_CONSULTATION:
        return {
          ...state,
          loading: false,
          consultations: state.consultations.map(consultation => {
            if (consultation._id === action.data) {
              consultation.finished = true;
              consultation.active = false;
            }
            return consultation;
          })
        };
    default:
      return state;
  }
}