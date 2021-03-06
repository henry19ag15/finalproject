import React, { useEffect, useState } from "react";
import style from "./MyPerfil.module.scss";
import noImg from "../../sass/noimg.png";
import loading from "../../sass/loading.gif";
import axios from "axios";
import { app } from "../../firebase/firebaseConfig";
import {
  getAuth,
  signOut,
  deleteUser,
  updateProfile,
  updatePassword,
} from "firebase/auth";
import { getMyProfile, getPostMyProfile } from "../../Redux/02-actions";
import { useDispatch, useSelector } from "react-redux";
// import myProfile from "./perfilSimulator.json";
import { AiFillSetting } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { MdClose } from "react-icons/md";
import Card from "../Card/Card";
import FollowModal from "./FollowModal";
import LazyLoad from "react-lazyload";
import LoadingPage from "../LoadingPage/LoadingPage";
import Error404 from "../Error404/Error404";
import { AiFillStar } from "react-icons/ai";
import { RiVipCrownFill } from "react-icons/ri";

export default function MyPerfil() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = auth.currentUser;

  const myProfile = useSelector((state) => state.myProfile);

  const history = useHistory();

  const [configNav, setConfigNav] = useState(false);
  const [inputsConfig, setInputsConfig] = useState({
    details: "",
    img: "",
    email: "",
    pass: "",
    passVal: "",
    displayName: "",
  });
  const [configOptions, setConfigOptions] = useState({});
  const [followActive, setFollowActive] = useState({
    view: false,
    type: "",
  });
  const [load, setLoad] = useState(0);

  const [loadForOptions, setLoadForOptions] = useState(false);

  const [error, setError] = useState("");
  const expression = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  useEffect(() => {
    dispatch(getMyProfile(auth.currentUser.uid)).then((res) => {
      // console.log("asdkjasd",res)
      if (res.payload.active === true) {
        setLoad(1);
      } else {
        setLoad(2);
      }
    });
    // console.log(perfil);
    // console.log(user);
  }, []);

  function handleLogout(e) {
    swal({
      title: "Cerrar sesion",
      text: "??Seguro que quieres cerrar sesion?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        signOut(auth)
          .then(() => {
            // Sign-out successful.
            // console.log("deslogueaste");
            history.push("/");
          })
          .catch((error) => {
            // An error happened.
          });
      } else {
        return;
      }
    });

    /*  signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("deslogueaste");
        history.push("/");
      })
      .catch((error) => {
        // An error happened.
      }); */
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

    swal({
      title: "??Estas seguro?",
      text: "Se eliminara su cuenta permanentemente!",
      icon: "error",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteUser(user)
          .then(() => {
            // User deleted.
            swal("Su cuenta fue eliminada", {
              icon: "success",
            });
            axios.delete(
              `https://pruebaconbackreal-pg15.herokuapp.com/user/destroy/${user.uid}`
            );
            history.push("/");
          })
          .catch((error) => {
            // An error ocurred
            // ...
          });
      } else {
        // swal("Your imaginary file is safe!");
      }
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

    swal({
      title: "??Estas seguro?",
      text: "si pone aceptar se cambiara su informaci??n",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .put(
            "https://pruebaconbackreal-pg15.herokuapp.com/user/setting/" +
              user.uid,
            {
              payload: { user: { detail: inputsConfig.details } },
            }
          )
          .then(() => {
            dispatch(getMyProfile(user.uid));
            swal("Se cambio su informaci??n satisfatoriamente!", {
              icon: "success",
            });
            dispatch(getMyProfile(user.uid));
            setConfigOptions({});
          });
      } else {
        // swal("Your imaginary file is safe!");
      }
    });
  }
  function handleChangePass(e) {
    e.preventDefault();
    if (inputsConfig.pass !== inputsConfig.passVal) {
      setError("La contrse??a ingresada debe ser igual en ambos campos");
    } else if (!expression.test(inputsConfig.pass.trim())) {
      setError(
        "La contrase??a debe tener m??nimo ocho caracteres, al menos una letra y un n??mero."
      );
    } else {
      swal({
        title: "??Estas seguro?",
        text: `Se cambiar?? la contrase??a de tu cuenta.`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          updatePassword(user, inputsConfig.pass)
            .then(() => {
              // Update successful.

              swal("Contrase??a cambiada correctamente", {
                icon: "success",
              });
              handleCancel();
              console.log("se cambio la contrase??a");
            })
            .catch((error) => {
              // An error ocurred
              // ...
              console.log(error);
            });
        } else {
          // swal("Your imaginary file is safe!");
        }
      });
    }
  }

  function handleChangeDisplayName(e) {
    e.preventDefault();

    swal({
      title: "??Estas seguro?",
      text: `${inputsConfig.displayName} va a ser tu nuevo nombre de usuario`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .put(
            "https://pruebaconbackreal-pg15.herokuapp.com/user/setting/" +
              user.uid,
            {
              payload: { user: { displayname: inputsConfig.displayName } },
            }
          )
          .then(() => {
            swal("Nombre de usuario cambiado con ??xito", {
              icon: "success",
            });

            dispatch(getMyProfile(user.uid));
            setConfigOptions({});
          });
      } else {
      }
    });
  }

  function handleCancel(e) {
    setConfigOptions({});
    setConfigNav(true);
    setError("");
  }

  let file = {};
  function handlePhoto(e) {
    e.preventDefault();
    file = e.target.files[0];
  }

  function handlePhotoSubmit(e) {
    e.preventDefault();

    swal({
      title: "??Estas seguro?",
      text: "Si apretas aceptar cambiaras tu foto de perfil",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setLoadForOptions(true);
        const change = async () => {
          const storageRef = await app
            .storage()
            .ref("users/" + user.uid + "/profile.jpg");
          await storageRef.put(file);
          const url = await storageRef.getDownloadURL();
          await updateProfile(auth.currentUser, {
            photoURL: url,
          }).then(() => {
            setLoadForOptions(false);
            axios.put(
              "https://pruebaconbackreal-pg15.herokuapp.com/user/setting/" +
                user.uid,
              {
                payload: { user: { profilephoto: user.photoURL } },
              }
            );

            swal("En unos segundos vas a ver los cambios!", {
              icon: "success",
            });

            setConfigOptions({});
          });
        };
        change();
      } else {
        // swal("Your imaginary file is safe!");
      }
    });
  }
  //////////////////////////////////////////////////

  function renderConfig() {
    if (configOptions.details) {
      return (
        <div className={style.inputsConfigBox}>
          <h3>Cambiar detalles</h3>
          <p>Ingrese su informaci??n</p>
          <input
            name="details"
            onChange={(e) => handleChangeInputsConfig(e)}
            type="text"
          />
          <div className={style.btnSelectBox}>
            <button onClick={(e) => handleChangeDetails(e)}>Aceptar</button>
            <button
              className={style.btnCancel}
              onClick={(e) => handleCancel(e)}
            >
              Cancelar
            </button>
          </div>
        </div>
      );
    } else if (configOptions.img) {
      return (
        <div className={style.inputsConfigBox}>
          <h3>Cambiar foto de perfil</h3>
          <p>Seleccione su nueva foto de perfil</p>
          <input
            className={style.inputFile}
            accept="image/png, image/jpeg"
            type="file"
            onChange={(e) => handlePhoto(e)}
          />
          <div className={style.btnSelectBox}>
            <button onClick={(e) => handlePhotoSubmit(e)}>Aceptar</button>
            <button
              className={style.btnCancel}
              onClick={(e) => handleCancel(e)}
            >
              Cancelar
            </button>
          </div>
        </div>
      );
    } else if (configOptions.pass) {
      return (
        <div className={style.inputsConfigBox}>
          <h3>Cambiar contrase??a</h3>
          <p>Solo se podra si recien inicias sesi??n</p>
          <p>Debe ingresar la contrase??a nueva en los dos campos</p>

          <input
            autoComplete="off"
            name="pass"
            type="password"
            onChange={(e) => handleChangeInputsConfig(e)}
          />
          <input
            autoComplete="off"
            name="passVal"
            type="password"
            onChange={(e) => handleChangeInputsConfig(e)}
          />
          {error ? <p>{error}</p> : ""}
          <div className={style.btnSelectBox}>
            <button onClick={(e) => handleChangePass(e)}>Aceptar</button>

            <button
              className={style.btnCancel}
              onClick={(e) => handleCancel(e)}
            >
              Cancelar
            </button>
          </div>
        </div>
      );
    } else if (configOptions.displayName) {
      return (
        <div className={style.inputsConfigBox}>
          <h3>Cambiar nombre de usuario</h3>
          <p>Ingrese el nombre de usuario nuevo</p>
          <input
            autoComplete="off"
            name="displayName"
            type="text"
            onChange={(e) => handleChangeInputsConfig(e)}
          />
          <div className={style.btnSelectBox}>
            <button onClick={(e) => handleChangeDisplayName(e)}>Aceptar</button>
            <button
              className={style.btnCancel}
              onClick={(e) => handleCancel(e)}
            >
              Cancelar
            </button>
          </div>
        </div>
      );
    }
  }

  //////// LOGICA DE POSTEOS ////////
  useEffect(() => {
    dispatch(getPostMyProfile([user.uid]));
  }, []);

  const myPosts = useSelector((state) => state.myPosts);
  const userPost = myPosts.sort((a, b) => {
    if (a.createdAt < b.createdAt) return 1;
    if (a.createdAt > b.createdAt) return -1;
    return 0;
  });

  ///////////////////////////////////

  function RenderMyProfile() {
    return (
      <div className={style.allMyPerfil}>
        <header className={style.cabeza}>
          <div className={style.imgFollBox}>
            {myProfile.orders.length ? (
              <div className={style.btnPremiumView}>
                <div className={style.iconStar}>
                  <AiFillStar />
                </div>
                <RiVipCrownFill />
              </div>
            ) : (
              false
            )}

            {user.photoURL ? (
              <img className={style.photoProfile} src={user.photoURL} alt="" />
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
                {myProfile.followers && <p>{myProfile.followers.length}</p>}
              </button>
              <button
                onClick={(e) =>
                  setFollowActive({ view: true, type: "following" })
                }
              >
                <p>Seguidos</p>
                {myProfile.followings && <p>{myProfile.followings.length}</p>}
              </button>
            </div>
          </div>
          <div className={style.nameConfigBox}>
            <div className={style.nameBox}>
              <h3>{myProfile.username}</h3>
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

          <div className={style.details}>
            <p>{myProfile.comment}</p>
          </div>
        </header>

        <div className={style.body}>
          <div
            className={
              configNav
                ? style.menuConfig
                : `${style.menuConfig} ${style.menuConfigOff}`
            }
          >
            <h4>Opciones</h4>
            {/* <button
        onClick={() => {
          console.log("este es user", user);
          swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your imaginary file is safe!");
            }
          });
        }}
      >
        {" "}
        ver user
      </button> */}

            <button name="displayName" onClick={(e) => handleClickConfig(e)}>
              Cambiar nombre de usuario
            </button>
            <button name="img" onClick={(e) => handleClickConfig(e)}>
              Cambiar foto de perfil
            </button>
            <button name="details" onClick={(e) => handleClickConfig(e)}>
              Cambiar detalles
            </button>
            <button name="pass" onClick={(e) => handleClickConfig(e)}>
              Cambiar contrase??a
            </button>
            <button
              className={style.btnLogout}
              onClick={(e) => handleLogout(e)}
            >
              Cerrar sesion
            </button>
            <div>
              {/*   <button
          className={style.btnDelete}
          onClick={(e) => handleDelete(e)}
        >
          Borrar Cuenta
        </button> */}
            </div>
          </div>
          {renderConfig()}
          <span className={style.myProfileContainer}>
            {userPost.length > 0 ? (
              userPost.map((el) => (
                <LazyLoad height={488} offset={5} key={el.id}>
                  <Card
                    locate="myProfile"
                    id={el.id}
                    key={el.id}
                    photo={el.photo}
                    detail={el.detail}
                    creator={el.autorId}
                    likes={el.likes}
                    createdAt={el.createdAt}
                  />
                </LazyLoad>
              ))
            ) : (
              <div className={style.nonePost}>
                <p>No hay publicaciones realizadas</p>
              </div>
            )}
          </span>
        </div>

        {followActive.view === true ? (
          <FollowModal
            setFollowActive={setFollowActive}
            followActive={followActive}
          />
        ) : (
          false
        )}

        {loadForOptions === true ? (
          <div className={style.load}>
            <img src={loading} alt="" />
          </div>
        ) : (
          false
        )}
      </div>
    );
  }

  if (load === 0) {
    return <LoadingPage />;
  } else if (load === 1) {
    return RenderMyProfile();
  } else if (load === 2) return <Error404 />;
}
