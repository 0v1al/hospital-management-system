import { ADD_MESSAGE, REMOVE_MESSAGE, LOAD_MESSAGES, UPDATE_MESSAGE, MARK_READ_MESSAGE } from "../actions/types";

const initialState = {
  loading: true,
  messages: []
};

export default function message(state = initialState, action) {
  switch(action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        loading: false,
        messages: [ ...state.messages, action.data ]
      };
    case REMOVE_MESSAGE: 
      return {
        ...state,
        loading: false,
        messages: state.messages.filter(message => message._id !== action.data)
      };
    case LOAD_MESSAGES: 
      return {
        ...state,
        loading: false,
        messages: [ ...action.data ]
      };
    case UPDATE_MESSAGE:
      return {
        ...state,
        loading: false,
        messages: state.messages.map(message => {
          if (message._id === action.data.messageId) {
            message.response = action.data.response;
            message.updateDate = action.data.updateDate;
            return message;
          }
          return message;
        })
      };
      case MARK_READ_MESSAGE:
        return {
          ...state,
          loading: false,
          messages: state.messages.map(message => {
            if (message._id === action.data.messageId) {
              message.updateDate = action.data.updateDate;
              message.read = true;
              return message;
            }
            return message;
          })
        };
    default:
      return state;
  }
}