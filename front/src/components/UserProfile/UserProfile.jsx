import React, { useEffect, useState } from "react";
import style from "./UserProfile.module.scss";
import noImg from "../../sass/noimg.png";
import axios from "axios";
import { app } from "../../firebase/firebaseConfig";
import {
  getAuth,
  signOut,
  deleteUser,
  updateProfile,
  updatePassword,
} from "firebase/auth";
import { getPostUserProfile, getUserProfile } from "../../Redux/02-actions";
import { useDispatch, useSelector } from "react-redux";

import { AiFillSetting } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import Card from "../Card/Card";
import FollowModalOtherProfile from "./FollowModalOtherProfile";

export default function UserProfile() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = auth.currentUser;
  const perfil = useSelector((state) => state.userView);
  const history = useHistory();

  const [followActive, setFollowActive] = useState({
    view: false,
    type: "",
  });

  const myProfile = useSelector((state) => state.myProfile);
  //   console.log(myProfile);
  var URLactual = window.location.pathname;
  const newStr = URLactual.slice(6, URLactual.length);
  useEffect(() => {
    dispatch(getUserProfile(newStr));
    // console.log(newStr);
    // console.log(perfil);
  }, []);

  //////////////// Logica de Follow /////////////////

  function handleFollow(e) {
    axios
      .put("https://pruebaconbackreal-pg15.herokuapp.com/user/follow", [
        user.uid,
        perfil.id,
      ])
      .then(() => {
        dispatch(getUserProfile(newStr));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const checkFollow = () => {
    const areFollow =
      perfil.followers && perfil.followers.filter((id) => id === user.uid);
    console.log(areFollow);
    if (areFollow && areFollow.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  ///////////////////////////////////////////////////

  //////////////// LOGICA DE POSTEOS /////////////////

  useEffect(() => {
    dispatch(getPostUserProfile([perfil.id]));
  }, [perfil]);

  const postsUser = useSelector((state) => state.postsUserProfile);
  const userPost = postsUser.sort((a, b) => {
    if (a.createdAt < b.createdAt) return 1;
    if (a.createdAt > b.createdAt) return -1;
    return 0;
  });

  ///////////////////////////////////////////////////

  return (
    <div className={style.allMyPerfil}>
      <header className={style.cabeza}>
        <div className={style.imgFollBox}>
          {perfil.profilephoto ? (
            <img
              className={style.photoProfile}
              src={perfil.profilephoto}
              alt=""
            />
          ) : (
            <img className={style.photoProfile} src={noImg} alt="" />
          )}

          <div className={style.followBox}>
            <button
              onClick={(e) =>
                setFollowActive({
                  view: true,
                  type: "followers",
                })
              }
            >
              <p>Seguidores</p>
              {perfil.followers && <p>{perfil.followers.length}</p>}
            </button>
            <button
              onClick={(e) =>
                setFollowActive({ view: true, type: "following" })
              }
            >
              <p>Seguidos</p>
              {perfil.following && <p>{perfil.following.length}</p>}
            </button>
          </div>
        </div>
        <div className={style.nameConfigBox}>
          <div className={style.nameBox}>
            <h3>{perfil.username}</h3>
            <h4>{perfil.email}</h4>
          </div>
          <div className={style.btnFollowBox}>
            {checkFollow() ? (
              <button className={style.follow} onClick={(e) => handleFollow(e)}>
                Seguir
              </button>
            ) : (
              <button
                className={style.unfollow}
                onClick={(e) => handleFollow(e)}
              >
                Dejar de seguir
              </button>
            )}
          </div>
        </div>

        <div className={style.details}>
          <p>{perfil.detail}</p>
        </div>
      </header>

      <body>
        <span>
          {userPost.length > 0 ? (
            userPost.map((el) => (
              <Card
                locate="userProfile"
                id={el.id}
                key={el.id}
                photo={el.photo}
                detail={el.detail}
                creator={el.creator}
                likes={el.likes}
                createdAt={el.createdAt}
              />
            ))
          ) : (
            <p>No hay publicaciones realizadas</p>
          )}
        </span>
      </body>

      {followActive.view === true ? (
        <FollowModalOtherProfile
          setFollowActive={setFollowActive}
          followActive={followActive}
        />
      ) : (
        false
      )}
    </div>
  );
}
