import { 
  LOAD_PATIENTS, 
  LOAD_PATIENT,
  UPDATE_PATIENT,
  REMOVE_PATIENT, 
  SEARCH_PATIENT,
  PATIENT_REPORTS
} from "../actions/types";

const initialState = {
  loading: true,
  patient: null,
  patients: []
};

export default function patient(state = initialState, action) {
  switch (action.type) {
    case LOAD_PATIENTS:
    case PATIENT_REPORTS:
      return {
        ...state,
        loading: false,
        patients: [ ...action.data ] 
      };
    case UPDATE_PATIENT:
      return {
        ...state,
        loading: false,
        patients: state.patients.map(patient => {
          if (patient.email === action.data.oldPatientEmail) {
            patient.firstname = action.data.newPatient.firstname;
            patient.lastname = action.data.newPatient.lastname;
            patient.email = action.data.newPatient.email;
            patient.contact = action.data.newPatient.contact;
            patient.address = action.data.newPatient.address;
            patient.age = action.data.newPatient.age;
            patient.male = action.data.newPatient.male;
            patient.female = action.data.newPatient.female;
            patient.medicalHistory = action.data.newPatient.medicalHistory;
          }
          return patient;
        })
      };
    case REMOVE_PATIENT:
      return {
        ...state,
        loading: false,
        patients: state.patients.filter(patient => patient._id !== action.data)
      };
    case SEARCH_PATIENT:
    case LOAD_PATIENT:
      return {
        ...state,
        loading: false,
        patient: action.data
      }
    default:
      return state;
  }
}