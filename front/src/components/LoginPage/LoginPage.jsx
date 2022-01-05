import React, { useState } from "react";
import style from "./LoginPage.module.scss";
import { Link } from "react-router-dom";
import googleImg from "../../sass/googleIcon.png";

export default function LoginPage() {
  const [inputs, setInputs] = useState({ email: "", pass: "" });

  function handleChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.vale });
  }

  function handleSubmit(e) {
      e.preventDefault()
  }

  return (
    <div className={style.allLoginPage}>
      <div className={style.contentBox}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <h3 className={style.titleText}>Iniciar sesion</h3>
          <div className={style.labelInputEmailBox}>
            <label htmlFor="email">E-mail</label>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="email"
              id="email"
            />
          </div>
          <div className={style.labelInputPassBox}>
            <label htmlFor="pass">Contraseña</label>
            <input
              onChange={(e) => handleChange(e)}
              type="password"
              name="pass"
              id="pass"
            />
          </div>
      <Link className={style.forgetPass} to="/recovery">¿Olvidaste la contraseña?</Link>
          <button type="submit" className={style.btnLogin}>Entrar</button>
        </form>

        <div className={style.googleLog}>
          <img src={googleImg} alt="" />
          <p>Sign in with Google</p>
        </div>
      </div>
    </div>
  );
}
