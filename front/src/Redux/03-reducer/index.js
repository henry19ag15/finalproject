const initialState = {
  estadoTest: "Hola",
<<<<<<< HEAD
  allUser: [],
  myProfile: {},
  userView: {},
  posts: [],
=======
  myProfile:{}
>>>>>>> d54904ae95fdfa36e35268206e0ff0962909a47f
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
<<<<<<< HEAD
        myProfile: action.payload,
      };

    case "GET_POSTS":
      return {
        ...state,
        posts: action.payload,
      };
=======
        myProfile: action.payload
      }
>>>>>>> d54904ae95fdfa36e35268206e0ff0962909a47f

    default:
      return state;
  }
}
