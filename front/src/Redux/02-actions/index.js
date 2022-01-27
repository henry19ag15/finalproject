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
      const Profile = await axios.get(`https://pruebaconbackreal-pg15.herokuapp.com/posts/getAll/${id}`)
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

////////////////// Actions Post //////////////////


export function getPostFromId(id) {


  console.log(id)
  return async function (dispatch) {

    try {

      const res = await axios.get(
        `https://pruebaconbackreal-pg15.herokuapp.com/posts/getAll/${id}`
      )
      return dispatch({
        type: 'GET_POST_FROM_ID',
        payload: res.data
      })
    } catch (error) {

      return dispatch({
        type: 'GET_POST_FROM_ID',
        payload: error
      })
    }





  }

}



export function getPost(payload) {
  return async function (dispatch) {
    try {
      const posts = await axios.post("https://pruebaconbackreal-pg15.herokuapp.com/posts/getbyusers", { payload: payload })
      return dispatch({
        type: "GET_POSTS",
        payload: posts.data
      })
    } catch (err) {
      console.log(err)
      return dispatch({
        type: 'GET_POSTS',
        payload: err
      })
    }
  }
}

export function getPostMyProfile(payload) {
  return async function (dispatch) {
    try {
      const posts = await axios.post("https://pruebaconbackreal-pg15.herokuapp.com/posts/getbyusers", { payload: payload })
      return dispatch({
        type: "GET_POSTS_MY_PROFILE",
        payload: posts.data
      })
    } catch (err) {
      console.log(err)
      return dispatch({
        type: 'GET_POSTS_MY_PROFILE',
        payload: err
      })
    }
  }

}




export function getPostUserProfile(payload) {
  return async function (dispatch) {
    try {
      const posts = await axios.post("https://pruebaconbackreal-pg15.herokuapp.com/posts/getbyusers", { payload: payload })
      return dispatch({
        type: "GET_POSTS_USER_PROFILE",
        payload: posts.data
      })
    } catch (err) {
      console.log(err)
      return dispatch({
        type: 'GET_POSTS_USER_PROFILE',
        payload: err
      })
    }
  }

}
//////////////////////////////////////////////////