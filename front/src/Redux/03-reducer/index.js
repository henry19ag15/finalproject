const initialState = {
  estadoTest: "Hola",
  allUser:[],
  myProfile:{},
  userView:{},
  posts:[]
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
      case 'GET_USER_PROFILE':{
        return {
          ...state,
          userView:action.payload
        }
      }

      case 'GET_ALL_USER':
        return {
          ...state,
          allUser:action.payload
        }

        case "GET_POSTS":
        return{
          ...state,
          posts:action.payload
        }

    default:
      return state;
  }



}
