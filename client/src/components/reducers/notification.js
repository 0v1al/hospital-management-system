import {
  ADD_NOTIFICATION_DOCTOR,
  ADD_NOTIFICATION_USER,
  LOAD_NOTIFICATIONS_USER,
  LOAD_NOTIFICATIONS_DOCTOR,
  MARK_VIEW_NOTIFICATIONS_DOCTOR,
  MARK_VIEW_NOTIFICATIONS_USER
} from "../actions/types";

const initialState = {
  loading: true,
  doctorNotifications: [],
  userNotifications: []
}

export default function notification(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTIFICATION_USER:
      return {
        ...state,
        loading: false,
        userNotifications: [ ...state.userNotifications, action.data ]
      };
    case ADD_NOTIFICATION_DOCTOR:
      return {
        ...state,
        loading: false,
        doctorNotifications: [ ...state.doctorNotifications, action.data ]
      };
    case LOAD_NOTIFICATIONS_USER: 
      return {
        ...state,
        loading: false,
        userNotifications: action.data
      };
    case LOAD_NOTIFICATIONS_DOCTOR: 
      return {
        ...state,
        loading: false,
        doctorNotifications: action.data 
      };
    case MARK_VIEW_NOTIFICATIONS_USER:
      return {
        ...state,
        loading: false,
        userNotifications: state.userNotifications.map(notification => {
          if (notification._user === action.data) {
            notification.viewByUser = true;
          }
          return notification;
        })
      };
      case MARK_VIEW_NOTIFICATIONS_DOCTOR:
        return {
          ...state,
          loading: false,
          doctorNotifications: state.doctorNotifications.map(notification => {
            if (notification._doctor === action.data) {
              notification.viewByDoctor = true;
            }
            return notification;
          })
        };
    default:
      return state;
  }
}