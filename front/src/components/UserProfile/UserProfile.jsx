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

export default function UserProfile() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = auth.currentUser;
  const perfil = useSelector((state) => state.userView);
  const history = useHistory();

  //   const myProfile = useSelector((state) => state.myProfile);
  console.log(perfil);
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
            <div>
              <p>Seguidores</p>
              {perfil.followers ? <p>{perfil.followers.length}</p> : <p>0</p>}
            </div>

            <div>
              <p>Seguidos</p>
              {perfil.following ? <p>{perfil.following.length}</p> : <p>0</p>}
            </div>
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
          {userPost?.map((el) => (
            <Card
              id={el.id}
              key={el.id}
              photo={el.photo}
              detail={el.detail}
              creator={el.creator}
              likes={el.likes}
              createdAt={el.createdAt}
            />
          ))}
        </span>
      </body>
    </div>
  );
}
