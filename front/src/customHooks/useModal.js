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
  const [counter, setCounter] = useState(0);

  console.log(form);
  console.log(user.id)

  ////  PARA MANEJAR EL ESTADO DEL CONTADOR DE CARACTERES //////
  const handleCounter = (event) => {
    if (counter < 0) {
      setCounter(0);
    } else if (event.keyCode === 8) {
      setCounter(counter - 1);
    } else {
      setCounter(counter + 1);
    }
  };

  //// PARA MANEJAR EL ESTADO AL ABRI Y CERRAR VENTA DE PUBLICACIONES ////
  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setIsOpen(false);
    setFileUrl(null);
    setForm({ creator: user.uid, imagen: "", detail: "", type: "Publico", imgUrl: null });
    setCounter(0);
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
        swal("Publicación creada correctamente", {
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
    counter,
    handleCounter,
    back,
  ];
};

export default useModal;
