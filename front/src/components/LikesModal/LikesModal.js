import React from "react";
import "./LikesModal.css";
import { useDispatch, useSelector } from "react-redux";
import noimg from '../../sass/noimg.png';
import {Link} from 'react-router-dom';

const LikesModal = ({ likes, setOpenLike, creator }) => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.allUser)

  

  const user= (userID) =>{
    const userToUse = users.filter(us => us.id === userID)

    return (
        <div className ='user-cointainer'>
            <Link className='Link' to={`/user/${userID}`}>
               {userToUse[0]?.profilephoto ? <img src={userToUse[0]?.profilephoto} alt='' className ='imagen'></img> : <img src={noimg} alt=''></img> }
                <p className='username'>{userToUse[0]?.username}</p>
            </Link>
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
