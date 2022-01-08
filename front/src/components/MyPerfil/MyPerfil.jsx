import React, { useEffect, useState } from "react";
import style from "./MyPerfil.module.scss";
import noImg from "../../sass/noimg.png";
import { getAuth, signOut } from "firebase/auth";
import { getMyProfile } from "../../Redux/02-actions";
import { useDispatch, useSelector } from "react-redux";
import myProfile from "./perfilSimulator.json";
import { AiFillSetting } from "react-icons/ai";

export default function MyPerfil() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = auth.currentUser;
  const [configNav, setConfigNav] = useState(false);
  const [inputsConfig, setInputsConfig] = useState({
    details: "",
    img: "",
    email: "",
    pass: "",
  });
  const [configOptions, setConfigOptions] = useState({
   
  });
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

function handleClickConfig(e){
  e.preventDefault()
  setConfigNav(false)
  setConfigOptions({
[e.target.name]:true
  })
}

////////// Logica de configurar perfil ///////////

function handleChangeDetails(e){

// axion.put('./',{id:uid,details:"asdjkasd"})


}

function handleCancel(e){
setConfigOptions({})
setConfigNav(true)
}
//////////////////////////////////////////////////


  function renderConfig() {
    if (configOptions.details) {
      return <div className={style.inputsConfigBox}>
        <input type="text" />
        <button onClick={e=>handleChangeDetails(e)}>Aceptar</button>
        <button onClick={(e)=>handleCancel(e)}>Cancelar</button>
      </div>;
    } else if (configOptions.img) {
      return <div className={style.inputsConfigBox}>
         <input type="text" />
        <button onClick={e=>handleChangeDetails(e)}>Aceptar</button>
        <button onClick={(e)=>handleCancel(e)}>Cancelar</button>
      </div>;
    } else if (configOptions.email) {
      return <div className={style.inputsConfigBox}>
         <input type="text" />
        <button onClick={e=>handleChangeDetails(e)}>Aceptar</button>
        <button onClick={(e)=>handleCancel(e)}>Cancelar</button>
      </div>;
    } else if (configOptions.pass) {
      return <div className={style.inputsConfigBox}>
         <input type="text" />
        <button onClick={e=>handleChangeDetails(e)}>Aceptar</button>
        <button onClick={(e)=>handleCancel(e)}>Cancelar</button>
      </div>;
    }
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
          </div>
        </div>
        <div className={style.nameConfigBox}>
          <div className={style.nameBox}>
            <h3>{user.displayName}Nombre de usuario</h3>
            <h4>{user.email}</h4>
          </div>

          <div className={style.menuPerfil}>
            <button
              onClick={(e) => setConfigNav(!configNav)}
              className={
                configNav
                  ? style.btnConfig
                  : `${style.btnConfig} ${style.btnRotate}`
              }
            >
              <AiFillSetting />
            </button>
          </div>
        </div>
      </header>

      <body>
        <div
          className={
            configNav
              ? style.menuConfig
              : `${style.menuConfig} ${style.menuConfigOff}`
          }
        >
          <button name="details" onClick={e=>handleClickConfig(e)}>Cambiar detalles</button>
          <button name="img" onClick={e=>handleClickConfig(e)}>Cambiar foto de perfil</button>
          <button name="email" onClick={e=>handleClickConfig(e)}>Cambiar e-mail</button>
          <button name="pass" onClick={e=>handleClickConfig(e)}>Cambiar contraseña</button>
        </div>

       {renderConfig()}
      </body>
    </div>
  );
}
