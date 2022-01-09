const initialState = {
  estadoTest: "Hola",
  myProfile:{}
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "POST_USER":
      return {
        ...state,
      };

    case 'GET_MY_PROFILE':
      return {
        ...state,
        myProfile: action.payload
      }

    default:
      return state;
  }



}
