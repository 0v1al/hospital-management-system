import {
  ADD_MEDICAL_HISTORY, 
  REMOVE_MEDICAL_HISTORY_DOCTOR, 
  REMOVE_MEDICAL_HISTORY_PATIENT, 
  LOAD_MEDICAL_HISTORIES 
} from "../actions/types";

const initialState = {
  loading: true,
  deletePatient: false,
  deleteDoctor: false,
  medicalHistories: []
};

export default function medicalHistory(state = initialState, action) {
  switch (action.type) {
    case ADD_MEDICAL_HISTORY:
      return {
        ...state,
        loading: false,
        medicalHistories: [ ...state.medicalHistories, action.data ]
      };
    case REMOVE_MEDICAL_HISTORY_PATIENT:
      return {
        ...state,
        loading: false,
        deletePatient: true,
        medicalHistories: state.medicalHistories.filter(medicalHistory => medicalHistory._id !== action.data)
      };
    case REMOVE_MEDICAL_HISTORY_DOCTOR:
      return {
        ...state,
        loading: false,
        deleteDoctor: true,
        medicalHistories: state.medicalHistories.filter(medicalHistory => medicalHistory._id !== action.data)
      };
    case LOAD_MEDICAL_HISTORIES:
      return {
        ...state,
        loading: false,
        medicalHistories: [ ...action.data ]
      }
    default:
      return state;
  }
}