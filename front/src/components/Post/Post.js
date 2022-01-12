import React from 'react';
import './Post.css';
import Modal from '../Modal/Modal';
import {FaRegPlusSquare } from "react-icons/fa";
import useModal  from '../../customHooks/useModal';
import { GrCamera } from "react-icons/gr";

const Post = () =>{
    const [isOpenModal, openModal, closeModal] = useModal();

    return(
        <div className='Post'>
            <FaRegPlusSquare onClick={() => openModal()}/>
            <Modal openModal={isOpenModal} closeModal={closeModal}> 
                <div className='post-container'>
                    <h2>Crear Publicación</h2>
                    <form className='form-post'>
                        <div className='img-container'>
                              <GrCamera />      
                        </div>
                        <div className='btn-upload'>
                            <input name='file' type='file' className='upload-file' accept='image/*'></input>
                            <label htmlFor='file'>Seleccionar foto</label>
                        </div>
                        {/* <textarea placeholder='Agregar descripcion' className='description'></textarea>
                        <button type='submit' className='post-btn'>Publicar</button> */}
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default Post