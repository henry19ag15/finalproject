import {React, useState} from 'react';
import './Post.css';
import {Link} from 'react-router-dom';
import Modal from '../Modal/Modal';
import {FaRegPlusSquare } from "react-icons/fa";
import useModal  from '../../customHooks/useModal';
import { GrCamera } from "react-icons/gr";
import { FaArrowLeft } from "react-icons/fa";



const Post = () =>{
    const [isOpenModal, openModal,
        closeModal, fileUrl,
        processImage, form,
        handleChange, handleSubmit,
        counter,  handleCounter,
        back] = useModal();


    return(
        <div className='Post'>
            <FaRegPlusSquare onClick={() => openModal()}/>
            <Modal openModal={isOpenModal} closeModal={closeModal}> 
                <div className='post-container'>
                    <div className={fileUrl ? 'header-post' : 'noBack'}>
                        <spam className='back-btn' onClick={() => back()}><FaArrowLeft /></spam>
                        <h2>Crear Publicación</h2>
                    </div>
                        <form className={fileUrl ? 'form-post' : 'without-button'} onSubmit={handleSubmit}>
                            <div className={fileUrl ? 'form-wrapper' : 'form-noimage'}>
                                <div className={ fileUrl ? 'img-container' : 'no-image' }>
                                    <GrCamera className='camera-icon'/>
                                    <img src={fileUrl} alt=''/>
                                    <div className='btn-upload'>
                                        <input name='file'
                                            type='file'
                                            className='upload-file'
                                            accept='image/*'
                                            onChange={processImage}
                                        />
                                        <label htmlFor='file'>Seleccionar imagen</label>
                                    </div>
                                </div>
        
                                <textarea name='detail'
                                        className='descripcion'
                                        placeholder='Agregar descripción'
                                        onChange={handleChange}
                                        maxlength="2000"
                                />
                            </div>
                            <select onChange={handleChange}>
                                        <option name='type' value='Publico'>Público</option>
                                        <option name='type' value='Privado'>Privado</option>
                            </select>
                            <button type='submit' className='post-btn'>Publicar</button>
                        </form>
                </div>
            </Modal>
        </div>
    )
}

export default Post