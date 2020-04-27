import {
  ADD_NOTIFICATION_DOCTOR,
  ADD_NOTIFICATION_PATIENT,
  LOAD_NOTIFICATIONS_PATIENT,
  LOAD_NOTIFICATIONS_DOCTOR,
  DELETE_NOTIFICATION_DOCTOR,
  DELETE_NOTIFICATION_PATIENT,
  MARK_VIEW_NOTIFICATION_DOCTOR,
  MARK_VIEW_NOTIFICATION_PATIENT
} from "../actions/types";

const initialState = {
  loading: true,
  doctorNotifications: [],
  patientNotifications: []
}

export default function notification(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTIFICATION_PATIENT:
      return {
        loading: false,
        ...state,
        patientNotifications: [ ...state.patientNotifications, action.data ]
      };
    case ADD_NOTIFICATION_DOCTOR:
      return {
        loading: false,
        ...state,
        doctorNotifications: [ ...state.doctorNotifications, action.data ]
      };
    case LOAD_NOTIFICATIONS_PATIENT: 
      return {
        loading: false,
        ...state,
        patientNotifications: [ ...action.data ]
      };
    case LOAD_NOTIFICATIONS_DOCTOR: 
      return {
        loading: false,
        ...state,
        doctorNotifications: [ ...action.data ]
      };
    case DELETE_NOTIFICATION_DOCTOR: 
      return {
        loading: false,
        ...state,
        doctorNotifications: state.doctorNotifications.filter(notification => notification._id !== action.data)
      };
    case DELETE_NOTIFICATION_PATIENT: 
      return {
        loading: false,
        ...state,
        patientNotifications: state.doctorNotifications.filter(notification => notification._id !== action.data)
      };
    case MARK_VIEW_NOTIFICATION_PATIENT:
      return {
        loading: false,
        ...state,
        patientNotifications: state.patientNotifications.map(notification => {
          if (notification._id === action.data) {
            notification.viewByPatient = true;
          }
          return notification;
        })
      };
      case MARK_VIEW_NOTIFICATION_DOCTOR:
        return {
          loading: false,
          ...state,
          doctorNotifications: state.doctorNotifications.map(notification => {
            if (notification._id === action.data) {
              notification.viewByDoctor = true;
            }
            return notification;
          })
        };
    default:
      return state;
  }
}