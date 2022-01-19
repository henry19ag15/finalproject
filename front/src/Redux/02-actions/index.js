import axios from "axios";

export function postUser(payload) {
  return async function () {
    await axios.post("https://pruebaconbackreal-pg15.herokuapp.com/user/register", { payload });
    return {
      type: "POST_USER",
    };
  };
}

export function getMyProfile(id) {
  return async function (dispatch) {
    try {
      const myProfile = await axios.get(`https://pruebaconbackreal-pg15.herokuapp.com/user/${id}`)
      return  dispatch( {
        type: 'GET_MY_PROFILE',
        payload: myProfile.data
      })
    } catch (error) {
      return dispatch({
        type: 'GET_MY_PROFILE',
        payload: error
      })
    }
  }
}