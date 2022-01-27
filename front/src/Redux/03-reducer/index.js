const initialState = {
  estadoTest: "Hola",

  // Información de usuarios //
  allUser: [],
  myProfile: {},
  userView: {},

  // Posteos //
  postsFromId:{},
  posts: [],
  myPosts: [],
  postsUserProfile: []

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
    case 'GET_USER_PROFILE': {
      return {
        ...state,
        userView: action.payload
      }
    }

    case 'GET_ALL_USER':
      return {
        ...state,
        allUser: action.payload
      }


case "GET_POST_FROM_ID":
  return {
    ...state,
    postsFromId: action.payload
  }



    case "GET_POSTS":
      return {
        ...state,
        posts: action.payload
      }

    case "GET_POSTS_MY_PROFILE":
      return {
        ...state,
        myPosts: action.payload
      }

    case "GET_POSTS_USER_PROFILE":
      return {
        ...state,
        postsUserProfile: action.payload
      }

    default:
      return state;
  }



}
