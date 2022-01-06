

export const regex = {
  email:
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
  password: /^.{6,12}$/, // 6 a 16 digitos.
  strictPassword:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/,
  // 6 caracteres, 1 letra minúscula, 1 letra mayúscula, 1 número y 1 caracter especial.
};

export const passwordValidation = (e, inputError, setInputError) => {
  const { id, value } = e.target;
  const val = value.length > 2

  /* if (value.length < 6 || value.length > 12) {
    setInputError({
      ...inputError,
      [id]: [true, "Debe tener como minimo 6 caracteres y máximo 12"],
    });
    return;
  } */
  if (value.includes(" ") ) {
    setInputError({
      ...inputError,
      [id]: [true, "No puede contener espacios en blanco"],
    });
    return;
  }
  /* if (!regex.strictPassword.test(value)) {
    setInputError({
      ...inputError,
      [id]: [
        true,
        "Debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial",
      ],
    });
    return;
  } */
  setInputError({ ...inputError, [id]: [false, ""] });
};

export const emailValidation = (e, inputError, setInputError) => {
  const { id, value } = e.target;
  const val = value.length > 4
  if (value === "") {
    setInputError({
      ...inputError,
      [id]: [false, ""],
    });
    return;
  }
  if (value.includes(" ") && val) {
    setInputError({
      ...inputError,
      [id]: [true, "No puede contener espacios en blanco"],
    });
    return;
  }
  if (!regex.email.test(value) && val) {
    setInputError({
      ...inputError,
      [id]: [
        true,
        "Debe ser un email válido",
      ],
    });
    return;
  }
  setInputError({ ...inputError, [id]: [false, ""] });
};
export const emailValidationSend = (email, inputError, setInputError) => {

  // console.log(value)
  if (email === "") {
    setInputError({
      ...inputError,
      email1: [true, "Ingresa un email válido"],
    });
    return false;
  }
  if (email.includes(" ") ) {
    setInputError({
      ...inputError,
      email1: [true, "No puede contener espacios en blanco"],
    });
    return false;
  }
  if (!regex.email.test(email)) {
    setInputError({
      ...inputError,
      email1: [
        true,
        "Debe ser un email válido",
      ],
    });
    return false;
  }
  setInputError({ ...inputError, email1: [false, ""] });
  return true
};

export const validateForm = (email, password, setInputError) => {
  let isValid = false;

  //   Campos vacios
  if (email === "" || password === "") {
    const emailError =
      email === "" ? [true, "Debe completar este campo"] : [false, ""];
    const passwordError =
      password === "" ? [true, "Debe completar este campo"] : [false, ""];
    setInputError({
      email1: emailError,
      pass1: passwordError,
    });

    return isValid;
  }

  //   Espacios en blanco
  if (email.includes(" ") || password.includes(" ")) {
    const emailError = email.includes(" ")
      ? [true, "No puede contener espacios en blanco"]
      : [false, ""];
    const passwordError = password.includes(" ")
      ? [true, "No puede contener espacios en blanco"]
      : [false, ""];
    setInputError({
      email1: emailError,
      pass1: passwordError,
    });
    return isValid;
  }

  //   Formato de correo electrónico
  if (!regex.email.test(email)) {
    setInputError({
      email1:[true,"Tiene que ser un formato email valido"],
      pass1: [false,""],
    });
    return isValid;
  } 

 /*  //  Formato de contraseña
  if (!regex.strictPassword.test(password)) {

    return isValid;
  } */

  isValid = true;
  return isValid;
};
