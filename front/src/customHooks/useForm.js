import { useState } from "react"
import app from "../firebase/firebaseConfig"
import { useDispatch } from "react-redux";
import { postUser } from "../Redux/02-actions/index.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
//El nombre solo puede contener letras 
//El apellido solo puede contener letras 
//La contraseña tiene que ser de 6 a 14 dígitos.
//El correo solo puede contener letras, numeros, puntos, guiones y guion bajo.



export const validateForm = (form) => {
    let errors = {}
    const expresiones = {
        nombre: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/, // Letras y espacios, pueden llevar acentos.
        password: /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/, // 6 a 14 digitos.
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    }

    if (!form.nombre.trim()) {
        errors.nombre = "El campo 'Nombre' es requerido";
    } else if (!expresiones.nombre.test(form.nombre.trim())) {
        errors.nombre = "El campo 'Nombre' sólo acepta letras y espacios en blanco";
    }

    if (!form.email.trim()) {
        errors.email = "El campo 'Email' es requerido";
    } else if (!expresiones.email.test(form.email.trim())) {
        errors.email = "Debe ser un correo valida y solo puede contener letras, numeros, puntos, guiones y guion bajo";
    }

    if (!form.password.trim()) {
        errors.password = "El campo 'Password' es requerido";
    } else if (!expresiones.password.test(form.password.trim())) {
        errors.password = "La contraseña debe tener mínimo ocho caracteres, al menos una letra mayúscula, un número y un carácter especial";
    }


    return errors
}


export const useForm = (initialState) => {
    const [form, setForm] = useState(initialState)
    const [errors, setErrors] = useState({})


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleReset = () => {
        setForm(initialState)
    }

    const handleBlur = (e) => {
        handleChange(e)
        setErrors(validateForm(form))
    }
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {

        console.log(form.email, form.password);

        e.preventDefault()
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, form.email, form.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                user.displayName = form.nombre
                const data = (({ email,displayName,uid }) => ({ email, displayName,uid }))(user);
                console.log(data)
                dispatch(postUser(data));

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error);
                // ..
            });
        // if (errors) {
        //     console.error(errors)
        // } else {
        //     await fetch('http://localhost:3001/register', {
        //         method: 'POST',
        //         body: JSON.stringify(form),
        //         headers: { "Content-Type": "application/json" }
        //     })
        //     console.log(form)
        //     console.log(errors.length)
        // }

        // handleReset()
    }

    return {
        form,
        errors,
        handleBlur,
        handleSubmit,
        handleChange
    }
}