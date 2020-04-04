import { ADD_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = [];

export default function patient (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case ADD_ALERT: 
      return [
        ...state,
        {
          msg: data.msg,
          type: data.type,
          id: data.id
        }
      ];
    case REMOVE_ALERT: {
      return state.filter(alert => {
        if (alert.id === data.id) return false;
        return true; 
      });
    }
    default:
      return state;
  }
}