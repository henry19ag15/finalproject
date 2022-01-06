import axios from "axios";

export function postUser(payload) {
  return async function () {
    await axios.post("http://localhost:3001/register", { payload });
    return {
      type: "POST_USER",
    };
  };
}

export function getMyProfile(id) {
  return async function (dispatch) {
    try {
      const myProfile = await axios.get(`http://localhost:3001/user/user/asdjdjerk458`)
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