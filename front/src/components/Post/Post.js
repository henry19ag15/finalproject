import {React} from 'react';
import './Post.css';
import Modal from '../Modal/Modal';
import {FaRegPlusSquare } from "react-icons/fa";
import useModal  from '../../customHooks/useModal';
import { GrCamera } from "react-icons/gr";
import { FaArrowLeft } from "react-icons/fa";
import PulseLoader from "react-spinners/PulseLoader";




const Post = () =>{
    const [isOpenModal, openModal,
        closeModal, fileUrl,
        processImage, form,
        handleChange, handleSubmit,
        back, loading] = useModal();


    return(
        <div className='Post'>
            <FaRegPlusSquare onClick={() => openModal()}/>
            <Modal openModal={isOpenModal} closeModal={closeModal}> 
            {loading ? <div className='loading'><PulseLoader size={12} color="#24B3D6" margin={7}/></div> : ''}
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
                                <div className='descripcion'>
                                    <textarea name='detail'
                                                placeholder='Agregar descripción'
                                                onChange={handleChange}
                                                maxlength="2000"
                                        />
                                    <select onChange={handleChange}>
                                                <option name='type' value='Publico'>Público</option>
                                                <option name='type' value='Privado'>Privado</option>
                                    </select>
                                    <button type='submit' className='post-btn'>Publicar</button>
                                </div>
                               
                            </div>
                        </form>
                </div>
            </Modal>
        </div>
    )
}

export default Post