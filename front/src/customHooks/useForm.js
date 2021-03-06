import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router-dom";
import axios from "axios";
//El nombre solo puede contener letras
//El apellido solo puede contener letras
//La contraseña tiene que ser de 6 a 14 dígitos.
//El correo solo puede contener letras, numeros, puntos, guiones y guion bajo.

export const validateForm = (form) => {
    let errors = {
        displayError: ''
    }


    const expresiones = {
        nombre: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/, // Letras y espacios, pueden llevar acentos.
        password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, // 
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    }

    //PARA SETEAR EL ESTADO DE LOS ERRORES
    if (!expresiones.nombre.test(form.displayname.trim())) {
        errors.displayError = "El campo 'Nombre' sólo acepta letras y espacios en blanco";
    }

     if (!expresiones.email.test(form.email.trim())) {
        errors.displayError = "Debe ingresar un correo valido";
    }

    if (!expresiones.password.test(form.password.trim())) {
        errors.displayError = "Contraseña ingresada incorrectamente";
      }

    if (!expresiones.email.test(form.email.trim())) {
        errors.email = "Debe ser un correo valida y solo puede contener letras, numeros, puntos, guiones y guion bajo";
    }

    if(form.password.trim() !== form.repeatPassword.trim()){
        errors.displayError = "La contraseña ingresada debe ser igual en los dos casilleros"
    }

    return errors
}


export const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({ displayError: "", succes: "" });
  const history = useHistory();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setForm(initialState);
  };

  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validateForm(form));
  };

  // console.log("form :",form)

  const handleSubmit = (e) => {
    e.preventDefault();

    if (errors.displayError) {
      return console.error(errors.displayError);
    } else {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, form.email, form.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          axios.post(
            "https://pruebaconbackreal-pg15.herokuapp.com/user/register",
            {
              email: form.email,
              photoURL: user.photoURL,
              password: form.password,
              displayname: form.displayname,
              uid: user.uid,
            }
          );
          setErrors({
            succes: "Usuario registrado correctamente",
          });
          handleReset();
          history.push("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          if (error) {
            setErrors({
              displayError:
                "El email con el que se intenta registrar ya esta siendo utilizado",
            });
          }
        });
    }
  };

  const handleClickShowPassword = () => {
    setForm({
      ...form,
      showPassword: !form.showPassword,
    });
  };

  return {
    form,
    errors,
    handleBlur,
    handleSubmit,
    handleChange,
    handleClickShowPassword,
  };
};
