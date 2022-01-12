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
import { getUserProfile } from "../../Redux/02-actions";
import { useDispatch, useSelector } from "react-redux";

import { AiFillSetting } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

export default function MyPerfil() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = auth.currentUser;
  const perfil = useSelector((state) => state.userView);
  const history = useHistory();
  const [configNav, setConfigNav] = useState(false);

  //   const myProfile = useSelector((state) => state.myProfile);
  //   console.log(myProfile);
  var URLactual = window.location.pathname;
  const newStr = URLactual.slice(6, URLactual.length);
  useEffect(() => {
    dispatch(getUserProfile(newStr));
    // console.log(newStr);
    // console.log(perfil);
  }, []);

  ////////// Logica de configurar perfil ///////////

  //////////////////////////////////////////////////

  return (
    <div className={style.allMyPerfil}>
      <header>
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
              {/* <p>{perfil.followers.length}</p> */}
            </div>

            <div>
              <p>Seguidos</p>
              {/* <p>{perfil.followers.length}</p> */}
            </div>
          </div>
        </div>
        <div className={style.nameConfigBox}>
          <div className={style.nameBox}>
            <h3>{perfil.username}</h3>
            <h4>{perfil.email}</h4>
          </div>
        </div>

        <div className={style.details}>
          <p>{perfil.detail}</p>
        </div>
      </header>

      <body>
        <span>Futuro muro aqui! </span>
      </body>
    </div>
  );
}
