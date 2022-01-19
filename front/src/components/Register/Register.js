import React from 'react';
import './register.css'
import { useForm, validateForm } from '../../customHooks/useForm';
import {Link} from 'react-router-dom'
import app from '../../firebase/firebaseConfig';
import Header from '../Header/Header';
import { FaArrowLeft } from "react-icons/fa";

const initialState ={
    displayname: '',
    email: '',
    password: '',
    repeatPassword: '',
    showPassword: false
}


const Register = () =>{

    const {
        form,
        errors,
        handleBlur,
        handleSubmit,
        handleChange
    } = useForm(initialState, validateForm)


    return(
        <div className='Register'>
            <Header />
            <div className='arrow-container'>
                <Link to='/'><FaArrowLeft className='back-arrow'/></Link>
                <p>Volver</p>
            </div>
            <h2 className='title'>Registro de Usuario</h2>
            <div className='big-continer'>
                <div className='form-continer'>
                    <form className='form' onSubmit={handleSubmit}>
                        <div className='input-group'>
                        <input type='text'
                            className='input'
                            name='displayname'
                            value={form.displayname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder='Nombre'
                            autoComplete='off'
                            required
                        />
                        
                            <input type='email'
                                className='input'
                                name='email'
                                value={form.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder='Email'
                                autoComplete='off'
                                required
                            />


                            <input type='password'
                                className='input'
                                name='password'
                                value={form.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder='Contraseña'
                                autocomplete="off"
                                required
                            />

                            <input type='password'
                                className='input'
                                name='repeatPassword'
                                value={form.repeatPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder='Repetir contraseña'
                                autocomplete="off"
                                required
                            />
                        </div>
                        {errors.displayError && <p className='error'>{errors.displayError}</p>}
                        {errors.succes && <p className='succes'>{errors.succes}</p>}

                        <button type='submit' className='buttons'>CREAR USUARIO</button>
                    </form>
                </div>
                <div className='rigth-continer'>
                    <h2 className='rigth-h2'>BIENVENIDO!</h2>
                    <ul>
                        <li>El campo 'Nombre' sólo acepta letras y espacios en blanco.</li>
                        <li>Debe ingresar un correo valida y solo puede contener letras, numeros, puntos, guiones y guion bajo.</li>
                        <li>La contraseña debe tener mínimo ocho caracteres, al menos una letra mayúscula, un número y un carácter especial.</li>
                    </ul>
                </div>
            </div>
            
     </div>
    )
}

export default Register