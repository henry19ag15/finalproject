import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";
import { MdIosShare } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { FiHeart } from "react-icons/fi";
import { BsFillHeartFill } from "react-icons/bs";

import styles from "./Card.module.scss";
import { getAuth } from "firebase/auth";
import noimg from "../../sass/noimg.png";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  getPost,
  getPostMyProfile,
  getPostUserProfile,
} from "../../Redux/02-actions";
import swal from "sweetalert";
//import EditPost from "../Edit/EditPost/EditPost";

// const img =  "https://static.eldiario.es/clip/71d118ff-5ef2-449c-be8a-6c321304fa70_16-9-aspect-ratio_default_0.jpg";

export default function Card({
  id,
  photo,
  creator,
  likes,
  detail,
  createdAt,
  locate,
}) {
  const auth = getAuth();
  const dispatch = useDispatch();
  const user = auth.currentUser;
  const profile = useSelector((state) => state.allUser);
  const myProfile = useSelector((state) => state.myProfile);
  const myPosts = useSelector((state) => state.myPosts);
  const useUser = profile.filter((el) => el.id === creator);
  const [configMenu, setconfigMenu] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const [postConfig, setPostConfig] = useState({
    view: false,
    edit: false,
    detail: detail,
  });

  function linkInPhoto() {
    if (creator === auth.currentUser.uid) {
      return `/profile`;
    } else {
      return `/user/${creator}`;
    }
  }

  ///////// LOGICA DE COMENTARIO /////////
  const [inputComment, setInputComment] = useState("");
  const [comment, setComment] = useState({});
  /*  const userFromComment = profile.filter(
    (user) => user.id === comment?.comment?.idUser
  ); */
  //console.log("acacac", comment);
  //console.log("comentario", comment.comment);

  useEffect(() => {
    axios
      .get(
        `https://pruebaconbackreal-pg15.herokuapp.com/comment/bringscomments/${id}`
      )
      .then((res) => {
        // console.log(`esto es res de ${id} `, res.data[0]);
        setComment({ comment: res.data });
      });
  }, []);

  function handleChange(e) {
    setInputComment(e.target.value);
  }

  function handleComment(e) {
    e.preventDefault();

    axios
      .post("https://pruebaconbackreal-pg15.herokuapp.com/comment/", {
        idUser: auth.currentUser.uid,
        idPost: id,
        detail: inputComment,
      })
      .then((res) => {
        setInputComment("");
        axios
          .get(
            `https://pruebaconbackreal-pg15.herokuapp.com/comment/bringscomments/${id}`
          )
          .then((res) => {

            setComment({ comment: res.data });
          });

        console.log({
          idUser: auth.currentUser.uid,
          idPost: id,
          detail: inputComment,
        });
      });
  }

   function submitEditPost() {
     axios.put(
      `https://pruebaconbackreal-pg15.herokuapp.com/posts/setting/${id}`,
      { payload: { id: id, detail: postConfig.detail} }
    );
    setPostConfig({ ...postConfig, edit: false, view: false });
    console.log('el postConfig: ',postConfig);

  }

  // async function submitEditPost(el) {
  //   await axios.put(
  //     `https://pruebaconbackreal-pg15.herokuapp.com/posts/setting/${id}`,
  //     { payload: { id: id, detail: postConfig.detail } }
  //   );
  //   console.log('el postConfig ',postConfig);
  //   setPostConfig({ ...postConfig, 
  //     [el.target.name]: el.target.value,
  //     edit: false, view: false });
  // }

  // function configPost() {
  //   return (
  //     <div>
  //       <button onClick={() => deletePost()}>Eliminar post</button>
  //       {postConfig.edit === false ? (
  //         <button onClick={() => editPost(true)}>Editar post</button>
  //       ) : (
  //         <button onClick={() => editPost(false)}>Cancelar edicion</button>
  //       )}
  //     </div>
  //   );
  // }


  function reverse(el) {
    return el.split("-").reverse().join("-");
  }

  function render(id) {
    const userFromComment = profile.filter((user) => user.id === id);

    return (
      <div className={styles.photoNameBox}>
        {userFromComment[0]?.profilephoto && (
          <img src={userFromComment[0].profilephoto} alt="" />
        )}
        {userFromComment[0]?.username && <p>{userFromComment[0].username}</p>}
      </div>
    );
  }

  /////////// EDITAR Y BORRAR POST /////////////
  // function deletePost() {
  //   axios.delete(
  //     `https://pruebaconbackreal-pg15.herokuapp.com/posts/destroy/${id}`
  //   );
  // }
  let contador = 0;

  function editPost(e) {
    if (e === true) {
      setPostConfig({ ...postConfig, edit: true });
    } else {
      setPostConfig({ ...postConfig, edit: false, view: false });
    }
  }

  ////////////////////////////////////////

  function handleLike(e) {
    function checkLocateCard() {
      switch (locate) {
        case "myProfile":
          dispatch(getPostMyProfile([auth.currentUser.uid]));

        case "home":
          const arrayIds = myProfile.followings.map((el) => el.autorId);
          myProfile.followings &&
            dispatch(getPost(arrayIds.concat(myProfile.id)));

        case "userProfile":
          dispatch(getPostUserProfile([creator]));

        default:
          break;
      }
    }

    e.preventDefault();
    axios
      .post(`https://pruebaconbackreal-pg15.herokuapp.com/posts/likes/`, {
        idUser: auth.currentUser.uid,
        idPost: id,
      })
      .then((res) => {
        checkLocateCard();
        console.log("res de likes: ", res);
      })
      .catch((error) => {
        console.log(error);
      });
    // .then((id) => {
    //   console.log('array de likes ', id)
    // })
  }

  function likeValidate() {
    const viewIdLikes = likes.filter(
      (like) => like.userId === auth.currentUser.uid
    );

    if (viewIdLikes.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  
  function handleDelete() {

      swal({
        title: "¿Estas seguro?",
        text: "¡Se eliminará su publicación permanentemente!",
        icon: "error",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.delete(
                `https://pruebaconbackreal-pg15.herokuapp.com/posts/destroy/${id}`
              );
              // Post deleted.
          swal("Publicación elimmiada.", {
            icon: "success",
          });
          console.log('Post eliminado')
        } else {
          console.log('Error al eliminar publicación')
        }
      })
    

      // swal({
      //   title: "¿Estas seguro?",
      //   text: "¡Se eliminará su publicación permanentemente!",
      //   icon: "error",
      //   buttons: true,
      //   dangerMode: true,
      // }).then((willDelete) => {
      //   if (willDelete) {
      //     deletePost(id)
      //       .then(() => {
      //         // Post deleted.
      //         swal("Publicación elimmiada.", {
      //           icon: "success",
      //         });
      //         axios.delete(
      //           `https://pruebaconbackreal-pg15.herokuapp.com/posts/destroy/${id}`
      //         );
      //         console.log('post eliminado')
      //       })
      //       .catch((error) => {
      //         console.log(error)
      //       });
      //   } else {
      //     console.log('Error al eliminar publicación')
      //   }
      // })
}




  return (
    <div className={styles.cardbody}>
      <div className={styles.cardData}>
        <nav to="/home">
          {" "}
          {/* TODO cambiar a link */}
          <img className={styles.img} src={photo}></img>
        </nav>
      </div>

      <div className={styles.cabeza}>
        <header className={styles.cardProfile}>
          <Link
            to={linkInPhoto()}
            //onClick={()=>setNavActive(false)}
            className={styles.profilePhoto}
          >
            {" "}
            {useUser[0].profilephoto ? (
              <img src={useUser[0].profilephoto} alt="" />
            ) : (
              <img src={noimg} alt="" />
            )}
          </Link>
          <div className={styles.profileName}>
            {" "}
            {useUser[0].username ? (
              <h4>{useUser[0].username}</h4>
            ) : (
              <h2>User</h2>
            )}
          </div>
          <section className={styles.datePosted}>
            {" "}
            {reverse(createdAt.substring(0, 10))}{" "}
          </section>
        </header>
        <section className={styles.btnBar}>
          <button
            className={
              likeValidate()
                ? ` ${styles.btnLike} ${styles.colorLike}`
                : styles.btnLike
            }
            onClick={(e) => handleLike(e)}
          >
            {" "}
            {likeValidate() ? <BsFillHeartFill /> : <FiHeart />}{" "}
          </button>
          <button className={creator === auth.currentUser.uid ?  styles.btnOption :  ` ${styles.btnHide} ${styles.btnOption} `}
                  onClick={(e) => setconfigMenu(!configMenu)} >
            <HiDotsHorizontal />{" "}
          </button>
          <section className={ configMenu ? styles.optionsBox : `${styles.optionsBox} ${styles.optionsHide}`}>
              <button className={styles.displayName}
              onClick={() => editPost(true)} >
                Editar...
              </button>
              <button className={styles.deltePost}
              onClick={()=>handleDelete()} >
                Borrar
              </button>
          </section>
          {/* Botones de borrar post y editar post -----> */}{" "}
          {/* {postConfig.view === true ? configPost() : (postConfig.view = false)} */}

          {/* <button className={styles.btnShare}>
            {" "}
            <MdIosShare />{" "}
          </button> */}
        </section>
      </div>

      <section className={styles.likes}> {likes.length} Likes </section>

      {postConfig.edit === false ? (
        <section className={styles.description}> {detail} </section>
      ) : (
        <div>
          <input
            onChange={(e) =>
              setPostConfig({ ...postConfig, detail: e.target.value })
              // setPostConfig({ ...postConfig, [e.target.name]: e.target.value })

            }
            type={"text"}
            defaultValue={postConfig.detail}
          ></input>
            <button onClick={()=> submitEditPost()}>Confirmar</button>
            <button onClick={() => editPost(false)}>Cancelar</button>
        </div>
      )}

      <div className={styles.inputCommentBox}>
        <input
          className={styles.input}
          type="test"
          name="comment"
          placeholder="Agregar comentario..."
          onChange={(e) => handleChange(e)}
          autoComplete="off"
          value={inputComment}
        ></input>
        <button onClick={(e) => handleComment(e)} className={styles.btnComment}>
          Publicar
        </button>
      </div>

      {comment.comment
        ? comment.comment.map((com) => {
            return (
              <div className={styles.commentBox}>
                {render(com.userId)}
                {com?.detail && (
                  <p className={styles.comentario}>{com.detail}</p>
                )}
              </div>
            );
          })
        : false}
    </div>
  );
}
