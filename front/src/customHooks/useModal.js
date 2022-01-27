import { useState } from "react";
import { getAuth } from "firebase/auth";
import { app } from '../firebase/firebaseConfig'
import swal from "sweetalert";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile, getPost, getPostMyProfile } from "../Redux/02-actions";
import MyPerfil from "../components/MyPerfil/MyPerfil";


const useModal = (initialValue = false) => {
  const dispatch = useDispatch()
  const auth = getAuth();
  const user = auth.currentUser
  const myProfile = useSelector(state => state.myProfile)
  const [isOpen, setIsOpen] = useState(initialValue);
  const [fileUrl, setFileUrl] = useState(null);
  const [form, setForm] = useState({
    creator: user.uid,
    imagen: "",
    detail: "",
    type: false,
  });

  const [loading, setLoading] = useState(false)
  const [limitPost, setLimitPost] = useState(false)
  // console.log(loading)







  //// PARA MANEJAR EL ESTADO AL ABRI Y CERRAR VENTA DE PUBLICACIONES + LOGICA DE LIMIT DE POST////
  const openModal = () => {
    setIsOpen(true)
    setLimitPost(false)

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + "1") + '-' + today.getDate();
    var postsToday = myProfile.posts.filter(el => el.createdAt.slice(0, 10) === "2022-01-27")

    if (!myProfile.orders.length && postsToday.length === 1) {
      setLimitPost(true)
    }
    if (myProfile.orders.length && postsToday.length === 3) {
      setLimitPost(true)
    }

    // console.log(myPostsToday)

  };

  const closeModal = () => {
    setIsOpen(false);
    setFileUrl(null);
    setForm({ creator: user.uid, imagen: "", detail: "", type: "Publico", imgUrl: null });
    setLoading(false)
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
    setForm({ creator: user.uid, imagen: "", detail: "", type: "Publico", imgUrl: null });
  };

  const handleSubmit = async (e) => {
    setLoading(true)
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
      private: form.type
    }).then((res) => {
      console.log(res)
      setLoading(false)
      swal("Publicaón creada correctamente", {
        icon: "success",
      })
      const arrayIds = myProfile.followers.map((el) => el.autorId)

      dispatch(getPost(arrayIds.concat(auth.currentUser.uid)))
      dispatch(getPostMyProfile([auth.currentUser.uid]))
      dispatch(getMyProfile(auth.currentUser.uid))
      handleReset();
      closeModal()
    }).catch((error) => {
      swal("No se pudo subir la publicaciones", {
        icon: "error",
      })

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
    loading,
    limitPost,
    setLimitPost
  ];
};

export default useModal;
