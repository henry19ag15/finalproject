import {React, useState} from 'react';
import './Recover.css';
import {Link} from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from '../../firebase/firebaseConfig';
import Header from '../Header/Header';
import { FaArrowLeft } from "react-icons/fa";

const RecoverPassword = () =>{
    const [recover, setRecover] = useState({email:''})
    const [succes, setSucces] = useState({message:''})
    const [error, setError] = useState({errors:''})

    const handleChange = (e) =>{
        setRecover({
            ...recover,
            [e.target.name]: e.target.value
        })
    }

    const handleReset = () =>{
        setRecover({email:''})
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        const auth = getAuth();
        sendPasswordResetEmail(auth, recover.email)
        .then(() => {
            // Password reset email sent!
            setSucces({
                message: 'Email de recuperacion enviado al correo indicado'
            })
            console.log('email enviado')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            if(!recover.email){
                setError({
                    errors: 'Debe ingresar un correo valido'
                }) 
            }
            else if(error){
                setError({
                    errors: 'El email no se encuentra registrado'
                }) 
            } else{
                setError({
                    errors: ''
                })
            }
        });
        handleReset()
    }
    return(
        <div className='Recover'>
            <Header />
            <div className='arrow-container'>
                <Link to='/'><FaArrowLeft className='back-arrow'/></Link>
                <p>Volver</p>
            </div>
            <h1 className='title-recover'>Recuperar contraseña</h1>
            <form className='recover-form' onSubmit={handleSubmit}>
                <input type='email'
                        name= 'email'
                        placeholder='Email'
                        value={recover.email}
                        onChange={handleChange}
                        className='input'
                />
                <button type='Submit'>Enviar</button>
            </form>
                {error.errors && <p className='errors-email'>{error.errors}</p>}
                {succes.message && <p className='errors-email'>{succes.message}</p>}
        </div>
    )
}

export default RecoverPassword