import React, { useEffect } from "react";
import style from "./MyPerfil.module.scss";
import noImg from "../../sass/noimg.png";
import { getAuth, signOut } from "firebase/auth";
import { getMyProfile } from "../../Redux/02-actions";
import { useDispatch, useSelector } from "react-redux";
import myProfile from "./perfilSimulator.json";

export default function MyPerfil() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = auth.currentUser;
  //   const myProfile = useSelector((state) => state.myProfile);
  //   console.log(myProfile);
  useEffect(() => {
    dispatch(getMyProfile(auth.currentUser.uid));
  }, []);

 

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
      
      <header>

      <div className={style.imgFollBox}>
        {noImg ? (
          <img className={style.photoProfile} src={noImg} alt="" />
        ) : (
          <img className={style.photoProfile} src={noImg} alt="" />
        )}

        <div className={style.followBox}>
          <div>
            <p>Seguidores</p>
            <p>{myProfile.followers.length}</p>
          </div>

          <div>
            <p>Seguidos</p>
            <p>{myProfile.followers.length}</p>
          </div>
          <div>
            <p>Subscripto</p>
            {/* <p>{myProfile.subscribed}</p> */}
          </div>
        </div>
      </div>
      <h3>{user.displayName}Nombre de usuario</h3>
      <h4>{user.email}</h4>
      </header>


    </div>
  );
}
