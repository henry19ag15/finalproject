import React from "react";
import "./LikesModal.css";
import { useDispatch, useSelector } from "react-redux";
import noimg from '../../sass/noimg.png';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { getUserProfile } from "../../Redux/02-actions";
import { getAuth } from "firebase/auth";

const LikesModal = ({ likes, setOpenLike, creator }) => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.allUser)
  const history = useHistory()
  const auth = getAuth()


  const user = (userID) => {
    const userToUse = users.filter(us => us.id === userID)


    function redirect() {

      if (userID === auth.currentUser.uid) {
        history.push("/profile")
      } else {


        history.push(`/user/${userID}`)
        dispatch(getUserProfile([userID]))
      }
    }


    return (
      <div className='user-cointainer'>
        <button className='Link' onClick={() => { redirect() }} >
          {userToUse[0]?.profilephoto ? <img src={userToUse[0]?.profilephoto} alt='' className='imagen'></img> : <img src={noimg} alt=''></img>}
          <p className='username'>{userToUse[0]?.username}</p>
        </button>
      </div>
    )
  }

  return (
    <div className="LikesModal">
      <div className="container-likes">
        <div className="header-like">
          <p>Me gusta</p>
          <button onClick={() => setOpenLike(false)}>X</button>
        </div>
        <div className="userlike-container">
          {likes.length !== 0 ? likes.map((el) => (user(el.userId))) : <p className='aviso-megusta'>No posee "Me Gusta" en esta publicación</p>}
        </div>
      </div>
    </div>
  );
};

export default LikesModal;
