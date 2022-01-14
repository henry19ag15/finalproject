import { useState } from "react";
import { getAuth } from "firebase/auth";
import {app} from '../firebase/firebaseConfig'
import swal from "sweetalert";
import axios from 'axios'



const useModal = (initialValue = false) => {
  
  const auth = getAuth();
  const user = auth.currentUser
  const [isOpen, setIsOpen] = useState(initialValue);
  const [fileUrl, setFileUrl] = useState(null);
  const [form, setForm] = useState({
    creator: user.uid,
    imagen: "",
    detail: "",
    type: "Público",
  });

  const [loading, setLoading] = useState(false)





  //// PARA MANEJAR EL ESTADO AL ABRI Y CERRAR VENTA DE PUBLICACIONES ////
  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setIsOpen(false);
    setFileUrl(null);
    setForm({ creator: user.uid, imagen: "", detail: "", type: "Publico", imgUrl: null });
  };

  const back = () => {
    setFileUrl(null);
  };
  let imageFile = {};
  const processImage = (event) => {
    imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setFileUrl(imageUrl);
    setForm({
      ...form,
      imagen: imageFile.name, imgUrl: imageFile
    });
  };

  //// PARA MANEJAR EL ESTADO DEL FORMULARIO ////
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setForm({ detail: "", imagen: "", id: "", type: "Público" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
      const storageRef = app
        .storage()
        .ref("posts/" + user.uid + "/" + form.imagen);
      await storageRef.put(form.imgUrl);
      const url = await storageRef.getDownloadURL();
      await axios.post("https://pruebaconbackreal-pg15.herokuapp.com/posts/", {
        photoURL: url,
        creator: form.creator,
        detail: form.detail,
      }).then(() =>{
        setLoading(false)
        swal("Publicaón creada correctamente", {
          icon: "success",
        });
        handleReset();
        closeModal()
      }).catch((error) =>{
        console.log(error)
      })
  };


  return [
    isOpen,
    openModal,
    closeModal,
    fileUrl,
    processImage,
    form,
    handleChange,
    handleSubmit,
    back,
    loading
  ];
};

export default useModal;
