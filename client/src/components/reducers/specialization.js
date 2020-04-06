import { ADD_SPECIALIZATION, LOAD_SPECIALIZATIONS } from "../actions/types";

const initialState = {
  loading: true,
  specializations: []
};

export default function specialization (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case ADD_SPECIALIZATION: 
      return {
        ...state,
        loading: false,
        specializations: [ ...state.specializations, data]
      };
    case LOAD_SPECIALIZATIONS:
      return {
        ...state,
        loading: false,
        specializations: [ ...data ]
      };
    default:
      return state;
  }
}

// export default function specialization (state = initialState, action) {
//   const { type, data } = action;
//   switch (type) {
//     case ADD_SPECIALIZATION: 
//       return [
//         ...state,
//         {
//           specialization: data.specialization,
//           creationDate: data.creationDate,
//           updateDate: data.updateDate,
//           id: data.id
//         }
//       ];
//     case LOAD_SPECIALIZATIONS:
//       return [
//         ...data
//       ];
//     default:
//       return state;
//   }
// }