import React, { useState } from "react";
import style from "./LoginPage.module.scss";
import { Link } from "react-router-dom";
import googleImg from "../../sass/googleIcon.png";
import axios from 'axios'
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import app from "../../firebase/firebaseConfig";
import {
  emailValidation,
  passwordValidation,
  validateForm,
} from "./validations";
import logo from "../NavBar/imgs/logo2.png";
import Header from "../Header/Header";
export default function LoginPage() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  // console.log(auth.currentUser);
  const [inputs, setInputs] = useState({ email: "", pass: "" });

  const [inputError, setInputError] = useState({
    email1: [false, ""],
    pass1: [false, ""],
  });

  const resetForm = () => {
    setInputs({ mail: "", pass: "" });
    setInputError({
      email1: [false, ""],
      pass1: [false, ""],
    });
  };

  function handleChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  function handleGoogle(e) {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        


        axios.post("https://pruebaconbackreal-pg15.herokuapp.com/user/register", {
          email: user.email,     
          photoURl:user.photoURL,     
          displayname: user.displayName,
          uid: user.uid,
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (validateForm(inputs.email, inputs.pass, setInputError)) {
      signInWithEmailAndPassword(auth, inputs.email, inputs.pass)
        .then((userCredential) => {
          resetForm();

          // Signed in
          const user = userCredential.user;
          // ...

          console.log("logueaste");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);

          if (errorCode === "auth/user-not-found") {
            console.log(errorCode);
            setInputError({
              ...inputError,
              email1: [true, "Usuario no encontrado!"],
            });
          } else if (errorCode === "auth/wrong-password") {
            console.log(errorCode);

            setInputError({
              ...inputError,
              pass1: [true, "Contraseña incorrecta"],
            });
          } else if (errorCode === "auth/invalid-email") {
            console.log(errorCode);

            setInputError({
              ...inputError,
              email1: [true, "El Email no es valido"],
            });
          } else {
            console.log(errorCode);
          }
        });
    }
  }

  return (
    <div className={style.allLoginPage}>
      <Header />
      <div className={style.contentBox}>
        <form className='form-login' onSubmit={(e) => handleSubmit(e)}>
          <h3 className={style.titleText}>Iniciar sesion</h3>
          <div className={style.labelInputEmailBox}>
            <label htmlFor="email">E-mail</label>
            <input
              className={inputError.email1[0] ? style.inputError : ``}
              onChange={(e) => handleChange(e)}
              type="text"
              name="email"
              id="email"
              value={inputs.email}
            />
            {inputError.email1[0] ? <span>{inputError.email1[1]}</span> : false}
          </div>
          <div className={style.labelInputPassBox}>
            <label htmlFor="pass">Contraseña</label>
            <input
              className={inputError.pass1[0] ? style.inputError : ``}
              onChange={(e) => handleChange(e)}
              type="password"
              name="pass"
              id="pass"
            />
            {inputError.pass1[0] ? <span>{inputError.pass1[1]}</span> : false}
          </div>
          <Link className={style.forgetPass} to="/recovery">
            ¿Olvidaste la contraseña?
          </Link>
          <button type="submit" className={style.btnLogin}>
            Entrar
          </button>
        </form>
        <Link className={style.registrate} to="/register">
          Registrate aqui!
        </Link>
        <button onClick={(e) => handleGoogle(e)} className={style.googleLog}>
          <img src={googleImg} alt="" />
          <p>Sign in with Google</p>
        </button>
      </div>
    </div>
  );
}
