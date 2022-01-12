import axios from "axios";

export function postUser(payload) {
  return async function () {
    await axios.post("https://pruebaconbackreal-pg15.herokuapp.com/user/register", { payload });
    return {
      type: "POST_USER",
    };
  };
}


export function getAllUser() {
  return async function (dispatch) {
    try {

      const allUser = await axios.get('https://pruebaconbackreal-pg15.herokuapp.com/user/')
      return dispatch({
        type: 'GET_ALL_USER',
        payload: allUser.data
      })
    } catch (err) {
      return dispatch({
        type: 'GET_ALL_USER',
        payload: err
      })
    }
  }
}

export function getMyProfile(id) {
  return async function (dispatch) {
    try {
      const myProfile = await axios.get(`https://pruebaconbackreal-pg15.herokuapp.com/user/${id}`)
      return dispatch({
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


export function getUserProfile(id) {
  return async function (dispatch) {
    try {
      const Profile = await axios.get(`https://pruebaconbackreal-pg15.herokuapp.com/user/${id}`)
      return dispatch({
        type: 'GET_USER_PROFILE',
        payload: Profile.data
      })
    } catch (error) {
      console.log(error)
      return dispatch({
        type: 'GET_USER_PROFILE',
        payload: "Se rompio"
      })
    }
  }
}