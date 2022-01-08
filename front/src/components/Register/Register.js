import React from 'react';
import './register.css'
import { useForm, validateForm } from '../../customHooks/useForm';
import app from '../../firebase/firebaseConfig';

const initialState ={
    displayname: '',
    email: '',
    password: '',
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
            <div className='header'>
                <h1 className='logo'>ShareIT</h1>
            </div>
            <h2 className='title'>Registro de Usuario</h2>
            <div className='big-continer'>
                <div className='form-continer'>
                    <form className='form' onSubmit={handleSubmit}>

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
                        {errors.displayname && <p className='error'>{errors.displayname}</p>}
                        
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
                        {errors.email && <p className='error'>{errors.email}</p>}


                            <input type='password'
                                className='input'
                                name='password'
                                value={form.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder='Contraseña'
                                required
                            />
                        {errors.password && <p className='error'>{errors.password}</p>}

                        <button type='submit' className='buttons'>CREAR USUARIO</button>
                        <p className='footer-text'>Ya posees una cuenta? <a className='back' href='http://localhost:3000/login'>Click aquí</a></p>
                    </form>
                </div>
                <div className='rigth-continer'>
                    <h2>BIENVENIDO!</h2>
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