import app from "../../firebase/firebaseConfig.js";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postUser } from "../../Redux/02-actions/index.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
  const dispatch = useDispatch();

  const [input, setInput] = useState({ email: "", contraseña: "" });

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, input.email, input.contraseña)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // dispatch(postUser(userCredential));
                // ...
                console.log("Se registro satisfactoriamente")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        // ..
        console.log("pasaron cosas")
      });
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input name="email" onChange={(e) => handleChange(e)} type="text" />
        <input
          name="contraseña"
          onChange={(e) => handleChange(e)}
          type="text"
        />
        <button type="submit"></button>
      </form>
    </div>
  );
}
