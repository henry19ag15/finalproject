const initialState = {
  estadoTest: "Hola",
  allUser: [],
  myProfile: {},
  userView: {},
  posts: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "POST_USER":
      return {
        ...state,
      };

    case "GET_MY_PROFILE":
      return {
        ...state,
        myProfile: action.payload,
      };

    case "GET_POSTS":
      return {
        ...state,
        posts: action.payload,
      };

    default:
      return state;
  }
}
