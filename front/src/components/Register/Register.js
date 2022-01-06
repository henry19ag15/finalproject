import React from 'react';
import './register.css'
import { useForm, validateForm } from '../../customHooks/useForm';

const initialState ={
    nombre: '',
    email: '',
    password: '',
    password2: ''
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
            <h2 className='title'>Registro de Usuario</h2>
        <div className='big-continer'>
            <div className='form-continer'>
                <form className='form' onSubmit={handleSubmit}>
                    <input type='text'
                        className='input'
                        name='nombre'
                        value={form.nombre}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder='Nombre'
                        autoComplete='off'
                        required
                    ></input>

                    {errors.nombre && <p className='error'>{errors.nombre}</p>}

                    <input type='email'
                        className='input'
                        name='email'
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder='Email'
                        autoComplete='off'
                        required
                    ></input>
                    {errors.email && <p className='error'>{errors.email}</p>}

                    <input type='password'
                        className='input'
                        name='password'
                        value={form.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder='Contraseña'
                        required
                    ></input>
                    {errors.password && <p className='error'>{errors.password}</p>}

                    <input type='password'
                        className='input'
                        name='password2'
                        value={form.password2}
                        onChange={handleChange}
                        placeholder='Repetir contraseña'
                        required
                    ></input>

                    <button type='submit' className='buttons'>CREAR USUARIO</button>
                    <p>Ya posees una cuenta? <a href='http://localhost:3001'>Click aquí</a></p>
                </form>
            </div>
            <div className='rigth-continer'>
                <h2>BIENVENIDO!</h2>
                <p>Encantado de verte</p>
            </div>
        </div>


        </div>
    )
}

export default Register