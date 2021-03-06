import { React, useEffect } from 'react';
import './Post.css';
import Modal from '../Modal/Modal';
import { FaRegPlusSquare } from "react-icons/fa";
import useModal from '../../customHooks/useModal';
import { GrCamera } from "react-icons/gr";
import { FaArrowLeft } from "react-icons/fa";
import PulseLoader from "react-spinners/PulseLoader";
import { useSelector } from 'react-redux';


  
  
  const Post = () => {
  const [
    isOpenModal,
    openModal,
    closeModal,
    fileUrl,
    processImage,
    form,
    handleChange,
    handleSubmit,
    back,
    loading,
    limitPost
  ] = useModal();


    var myProfile = useSelector((state) => state.myProfile)
    console.log(myProfile)







    return (
        <div className='Post'>
            <FaRegPlusSquare onClick={() => openModal()}/>
            <Modal openModal={isOpenModal} closeModal={closeModal}> 
            {loading ? <div className='loading'><PulseLoader size={12} color="#24B3D6" margin={7}/></div> : ''}
            {limitPost === true ? <div className='post-container post-container-empty'>
                    <h4>Alcanzaste tu limite para crear posts!</h4>
            <button className='close' onClick={closeModal}>X</button>


                </div>:
                <div className='post-container post'>
                    <div className={fileUrl ? 'header-post' : 'noBack'}>
                        <spam className='back-btn' onClick={() => back()}><FaArrowLeft /></spam>
                        <h2>Crear Publicación</h2>
                        <button className='close' onClick={closeModal}>X</button>
                    </div>
                        <form className={fileUrl ? 'form-post' : 'without-button'} onSubmit={handleSubmit}>
                            <div className={fileUrl ? 'form-wrapper' : 'form-noimage'}>
                                <div className={fileUrl ? 'img-container' : 'no-image'}>
                                    <GrCamera className='camera-icon' />
                                    <img src={fileUrl} alt='' />
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
                                <div className='descripcion'>
                                    <textarea name='detail'
                                        placeholder='Agregar descripción'
                                        onChange={handleChange}
                                        maxlength="2000"
                                    />
                                  
                                    <button type='submit' className='post-btn'>Publicar</button>
                                </div>

                            </div>
                        </form>

                    </div>}
            </Modal>
        </div>
      
    
  );
};

export default Post;
