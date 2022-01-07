import { useState } from "react"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
//El nombre solo puede contener letras 
//El apellido solo puede contener letras 
//La contraseña tiene que ser de 6 a 14 dígitos.
//El correo solo puede contener letras, numeros, puntos, guiones y guion bajo.


export const validateForm =(form) =>{
    let errors = {}

    const expresiones = {
        nombre: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/, // Letras y espacios, pueden llevar acentos.
        password: /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/, // 6 a 14 digitos.
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    }

    //PARA SETEAR EL ESTADO DE LOS ERRORES
    if (!form.displayname.trim()) {
        errors.nombre = "El campo 'Nombre' es requerido";
    } else if (!expresiones.nombre.test(form.displayname.trim())) {
        errors.nombre = "El campo 'Nombre' sólo acepta letras y espacios en blanco";
    }

    if (!form.email.trim()) {
        errors.email = "El campo 'Email' es requerido";
    } else if (!expresiones.email.test(form.email.trim())) {
        errors.email = "Debe ser un correo valida y solo puede contener letras, numeros, puntos, guiones y guion bajo";
    }

    if (!form.password.trim()) {
        errors.password = "El campo 'Contraseña' es requerido";
      } else if (!expresiones.password.test(form.password.trim())) {
        errors.password = "La contraseña debe tener mínimo ocho caracteres, al menos una letra mayúscula, un número y un carácter especial";
      }


    return errors
}


export const useForm = (initialState) => {
    const [form, setForm] = useState(initialState)
    const [errors, setErrors] = useState({})
    

    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const handleReset =() =>{
        setForm(initialState)
    }

    const handleBlur = (e) =>{
        handleChange(e)
        setErrors(validateForm(form))
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(errors){
            console.error(errors)
        }else{
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, form.email, form.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        } 

        handleReset()
    }

    const handleClickShowPassword = () => {
        setForm({
          ...form,
          showPassword: !form.showPassword,
        });
      };

    return{
        form,
        errors,
        handleBlur,
        handleSubmit,
        handleChange,
        handleClickShowPassword
    }
}