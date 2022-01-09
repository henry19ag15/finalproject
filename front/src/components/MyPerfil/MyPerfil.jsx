import React, { useEffect, useState } from "react";
import style from "./MyPerfil.module.scss";
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
import { getMyProfile } from "../../Redux/02-actions";
import { useDispatch, useSelector } from "react-redux";
import myProfile from "./perfilSimulator.json";
import { AiFillSetting } from "react-icons/ai";
import { useHistory } from "react-router-dom";

export default function MyPerfil() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = auth.currentUser;
  const perfil = useSelector((state) => state.myProfile);
  const history = useHistory();

  const [configNav, setConfigNav] = useState(false);
  const [inputsConfig, setInputsConfig] = useState({
    details: "",
    img: "",
    email: "",
    pass: "",
    displayName:""
  });
  const [configOptions, setConfigOptions] = useState({});
  //   const myProfile = useSelector((state) => state.myProfile);
  //   console.log(myProfile);
  useEffect(() => {
    dispatch(getMyProfile(auth.currentUser.uid));
    console.log(perfil);
  }, []);
  // console.log();
  function handleLogout(e) {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("deslogueaste");
        history.push("/");
      })
      .catch((error) => {
        // An error happened.
      });
  }

  function handleClickConfig(e) {
    e.preventDefault();
    setConfigNav(false);
    setConfigOptions({
      [e.target.name]: true,
    });
  }

  function handleDelete(e) {
    // app.storage().ref('users/' + user.uid).delete().then(() => { console.log("foto borrada") }).catch((error) => { console.log(error) })
    deleteUser(user)
      .then(() => {
        // User deleted.
        axios.delete(`http://localhost:3001/user/destroy/:${user.uid}`);
        history.push("/");
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });
  }

  ////////// Logica de configurar perfil ///////////
  function handleChangeInputsConfig(e) {
    setInputsConfig({
      ...inputsConfig,
      [e.target.name]: e.target.value,
    });
  }

  function handleChangeDetails(e) {
    e.preventDefault();
    // Cambia la configuracion en la base de datos -> va en el .then
    // console.log("llega aca?");
    axios.put("http://localhost:3001/user/setting/" + user.uid, {
      payload: { user: { detail: inputsConfig.details } },
    }).then(
      dispatch(getMyProfile(user.uid))
    );
  }
  function handleChangePass(e) {
    e.preventDefault();
    updatePassword(user, inputsConfig.pass)
      .then(() => {
        // Update successful.
        console.log("se cambio la contraseña");
      })
      .catch((error) => {
        // An error ocurred
        // ...
        console.log(error);
      });
  }


  function handleChangeDisplayName (e){
e.preventDefault()
axios.put("http://localhost:3001/user/setting/" + user.uid, {
  payload: { user: { displayname: inputsConfig.displayName } },
}).then(
  dispatch(getMyProfile(user.uid))
);

  }


  function handleCancel(e) {
    setConfigOptions({});
    setConfigNav(true);
  }
  


  let file = {};
  function handlePhoto(e) {
    e.preventDefault();
    file = e.target.files[0];
  }




  async function handlePhotoSubmit(e) {
    e.preventDefault();
    const storageRef = await app
      .storage()
      .ref("users/" + user.uid + "/profile.jpg");
    await storageRef.put(file);
    const url = await storageRef.getDownloadURL();
    await updateProfile(auth.currentUser, {
      photoURL: url,
    });
  }
  //////////////////////////////////////////////////

  function renderConfig() {
    if (configOptions.details) {
      return (
        <div className={style.inputsConfigBox}>
          <input
            name="details"
            onChange={(e) => handleChangeInputsConfig(e)}
            type="text"
          />
          <button onClick={(e) => handleChangeDetails(e)}>Aceptar</button>
          <button onClick={(e) => handleCancel(e)}>Cancelar</button>
        </div>
      );
    } else if (configOptions.img) {
      return (
        <div className={style.inputsConfigBox}>
          <input type="file" onChange={(e) => handlePhoto(e)} />
          <button onClick={(e) => handlePhotoSubmit(e)}>Aceptar</button>
          <button onClick={(e) => handleCancel(e)}>Cancelar</button>
        </div>
      );
    } else if (configOptions.pass) {
      return (
        <div className={style.inputsConfigBox}>
          <input
            name="pass"
            type="text"
            onChange={(e) => handleChangeInputsConfig(e)}
          />
          <button onClick={(e) => handleChangePass(e)}>Aceptar</button>
          <button onClick={(e) => handleCancel(e)}>Cancelar</button>
        </div>
      );
    }else if (configOptions.displayName) {
      return (
        <div className={style.inputsConfigBox}>
          <input
            name="displayName"
            type="text"
            onChange={(e) => handleChangeInputsConfig(e)}
          />
          <button onClick={(e) => handleChangeDisplayName(e)}>Aceptar</button>
          <button onClick={(e) => handleCancel(e)}>Cancelar</button>
        </div>
      );
    }
  }

  return (
    <div className={style.allMyPerfil}>
      <header>
        <div className={style.imgFollBox}>
          {user.photoURL ? (
            <img className={style.photoProfile} src={user.photoURL} alt="" />
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
            <h3>{perfil.username}</h3>
            <h4>{user.email}</h4>
          </div>

          <div className={style.details}>
            <p>{perfil.detail}</p>
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
          <button name="details" onClick={(e) => handleClickConfig(e)}>
            Cambiar detalles
          </button>
          <button onClick={() => console.log("este es user", perfil)}>
            {" "}
            ver user
          </button>
          <button name="img" onClick={(e) => handleClickConfig(e)}>
            Cambiar foto de perfil
          </button>

          <button name="pass" onClick={(e) => handleClickConfig(e)}>
            Cambiar contraseña
          </button>
          <button name="displayName" onClick={(e) => handleClickConfig(e)}>
            Cambiar nombre de usuario
          </button>
          <button onClick={(e) => handleLogout(e)}>Cerrar sesion</button>
          <button onClick={(e) => handleDelete(e)}>Borrar Cuenta</button>
        </div>
        {renderConfig()}
        <span>Hola si </span>
      </body>
    </div>
  );
}
