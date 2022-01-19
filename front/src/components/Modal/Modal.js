import React from 'react';
import './Modal.css'
import { FaTimes } from "react-icons/fa";


const Modal = ({children, openModal, closeModal}) =>{
    
    return(
        <article className={openModal ? 'isOpen' : 'modal'}>
            <div className='modal-container'>
                <button className='close' onClick={closeModal}><FaTimes /></button>
                {children}
            </div>
        </article>
    )
}

export default Modal