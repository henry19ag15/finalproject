import React, { useEffect } from "react";
import style from "./MyPerfil.module.scss";
import noImg from "../../sass/noimg.png";
import { getAuth, signOut } from "firebase/auth";
import { getMyProfile } from "../../Redux/02-actions";
import { useDispatch, useSelector } from "react-redux";

export default function MyPerfil() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = auth.currentUser;
  const myProfile = useSelector((state) => state.myProfile);
  console.log(myProfile);
  useEffect(() => {}, []);

  function aux() {
    dispatch(getMyProfile(auth.currentUser.uid));
    console.log("se llamo");
  }

  function handleLogout(e) {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("deslogueaste");
      })
      .catch((error) => {
        // An error happened.
      });
  }
  return (
    <div className={style.allMyPerfil}>
      <button onClick={(e) => handleLogout(e)}>Cerrar sesion</button>
      <button onClick={(e) => aux(e)}>llamar</button>

      {user.photoURL ? (
        <img src={user.photoURL} alt="" />
      ) : (
        <img className={style.photoProfile} src={noImg} alt="" />
      )}

      <div>
        <div>
          <p>Seguidores</p>
          {/* <p>{myProfile.followers.length}</p> */}
        </div>

        <div>
          <p>Seguidos</p>
          {/* <p>{myProfile.followers.length}</p> */}
        </div>
        <div>
            <p>Subscripto</p>
            <p>{myProfile.subscribed}</p>
        </div>
      </div>
    </div>
  );
}
