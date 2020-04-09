import { ADD_SPECIALIZATION, LOAD_SPECIALIZATIONS, REMOVE_SPECIALIZATION, EDIT_SPECIALIZATION } from "../actions/types";

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
    case REMOVE_SPECIALIZATION:
      return {
        ...state,
        loading: false,
        specializations: state.specializations.filter(spec => spec.specialization !== data)
      }
    case EDIT_SPECIALIZATION:
      return {
        ...state,
        loading: false,
        specializations: state.specializations.map(spec => {
          if (spec.specialization === data.specialization) {
            spec.specialization = data.newSpecialization.specialization
            spec.updateDate = data.newSpecialization.updateDate;
          }
          return spec;
        })
      }
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