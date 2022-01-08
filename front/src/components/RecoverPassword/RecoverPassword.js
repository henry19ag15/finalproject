import {React, useState} from 'react';
import './Recover.css'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from '../../firebase/firebaseConfig';

const RecoverPassword = () =>{
    const [recover, setRecover] = useState({email:''})
    const [error, setError] = useState({errors:''})

    const handleChange = (e) =>{
        setRecover({
            ...recover,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) =>{
        e.preventDefault()

        const auth = getAuth();
        sendPasswordResetEmail(auth, recover.email)
        .then(() => {
            // Password reset email sent!
            // ..
            console.log('email enviado')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..

            if(error){
                setError({
                    errors: 'El email no se encuentra registrado'
                }) 
            } else{
                setError({
                    errors: ''
                })
            }
        });
    }
    return(
        <div className='Recover'>
            <h1 className='title-recover'>Recuperar contraseña</h1>
            <form className='recover-form' onSubmit={handleSubmit}>
                <input type='email'
                        name= 'email'
                        placeholder='Email'
                        value={recover.email}
                        onChange={handleChange}
                />
                <button type='Submit'>Enviar</button>
            </form>
                {error.errors && <p className='errors-email'>{error.errors}</p>}
        </div>
    )
}

export default RecoverPassword