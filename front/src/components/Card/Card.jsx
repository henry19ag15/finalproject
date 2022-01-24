import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdIosShare } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { FiHeart } from "react-icons/fi";
import { BsFillHeartFill } from "react-icons/bs";
import swal from "sweetalert";
import loading from "../../sass/loading.gif";

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
  const profile = useSelector((state) => state.allUser);
  // console.log("este es el id", id);
  const user = auth.currentUser;
  const myProfile = useSelector((state) => state.myProfile);
  const userView = useSelector((state) => state.userView);

  const useUser = profile.filter((el) => el.id === creator);
  //console.log("esto es el user: ", useUser);
  // console.log(useUser[0].username);
  // console.log("es id ", id);
  const [postConfig, setPostConfig] = useState({
    view: false,
    edit: false,
    detail: detail,
  });
  const [load, setLoad] = useState(false);

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
  const [indexComment, setIndexComment] = useState(2);
  const commentSorted = comment?.comment?.sort((a, b) => {
    if (a.createdAt < b.createdAt) return 1;
    if (a.createdAt > b.createdAt) return -1;
    return 0;
  });
  const commentSlice = commentSorted?.slice(0, indexComment);

  function handleVerMas() {
    setIndexComment(indexComment + 2);

    console.log(commentSorted.length, " es menor a ", indexComment);
  }

  function handleVerMenos() {
    setIndexComment(2);
  }

  function renderBtnVer() {
    return commentSorted?.length - 1 >= indexComment ? (
      <button className={styles.btnVerMas} onClick={() => handleVerMas()}>
        Ver mas comentarios...
      </button>
    ) : (
      <button className={styles.btnVerMenos} onClick={() => handleVerMenos()}>
        ...Ocultar comentarios
      </button>
    );
  }

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
        console.log("res 1", res);
        setInputComment("");
        axios
          .get(
            `https://pruebaconbackreal-pg15.herokuapp.com/comment/bringscomments/${id}`
          )
          .then((res) => {
            console.log("res 2", res);
            setComment({ comment: res.data });
          });

        /*  console.log({
          idUser: auth.currentUser.uid,
          idPost: id,
          detail: inputComment,
        }); */
      });
  }

  function reverse(el) {
    return el.split("-").reverse().join("-");
  }

  function Render(id, Comment) {
    const userFromComment = profile.filter((user) => user.id === id);

    return (
      <div className={styles.photoNameBox}>
        <div className={styles.imgBox}>
          {userFromComment[0]?.profilephoto && (
            <img src={userFromComment[0].profilephoto} alt="" />
          )}
        </div>
        <div className={styles.commentTextBox}>
          {userFromComment[0]?.username && (
            <p className={styles.name}>{userFromComment[0].username}</p>
          )}
          <p>{Comment}</p>
        </div>
      </div>
    );
  }

  /////////// EDITAR Y BORRAR POST /////////////
  function deletePost() {
    swal({
      title: "Editar Post",
      text: "¿Seguro que quieres editar el post?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setLoad(true);
        axios
          .delete(
            `https://pruebaconbackreal-pg15.herokuapp.com/posts/destroy/${id}`
          )
          .then(() => {
            setLoad(false);
            setPostConfig({ ...postConfig, view: false, edit: false });
            if (locate === "home") {
              const post = myProfile.followings.map((user) => user.autorId);
              dispatch(getPost(post.concat(auth.currentUser.uid)));
            } else if (locate === "myProfile") {
              dispatch(getPostMyProfile([auth.currentUser.uid]));
            }
          });
      } else {
        return;
      }
    });
  }

  let contador = 0;

  function editPost(e) {
    if (e === true) {
      setPostConfig({ ...postConfig, edit: true });
    } else {
      setPostConfig({ ...postConfig, edit: false });
    }
  }

  function submitEditPost() {
    swal({
      title: "Editar Post",
      text: "¿Seguro que quieres editar el post?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          setLoad(true);
          axios
            .put(
              `https://pruebaconbackreal-pg15.herokuapp.com/posts/setting/${id}`,
              { payload: { id: id, detail: postConfig.detail } }
            )
            .then(() => {
              setLoad(false);
              setPostConfig({ ...postConfig, view: false, edit: false });
              if (locate === "home") {
                const post = myProfile.followings.map((user) => user.autorId);
                dispatch(getPost(post.concat(auth.currentUser.uid)));
              } else if (locate === "myProfile") {
                dispatch(getPostMyProfile([auth.currentUser.uid]));
              }
            });
        } else {
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function configPost() {
    return (
      <div className={styles.editBox}>
        <div className={styles.card}>
          <div className={styles.head}>
            <button
              onClick={(e) =>
                setPostConfig({ ...postConfig, view: false, edit: false })
              }
              className={styles.buttonClose}
            >
              X
            </button>
          </div>
          {postConfig.edit === false ? (
            <div className={styles.bodycardnoedit}>
              <button className={styles.cancelar} onClick={() => deletePost()}>
                Eliminar post
              </button>
              <button onClick={() => editPost(true)}>Editar post</button>
            </div>
          ) : (
            <div className={styles.bodycard}>
              <div className={styles.btnBox}>
                <button
                  className={styles.cancelar}
                  onClick={() => editPost(false)}
                >
                  Cancelar edicion
                </button>
                <button onClick={() => submitEditPost()}>Confirmar</button>
              </div>
              <div className={styles.inputBox}>
                <textarea
                  onChange={(e) =>
                    setPostConfig({ ...postConfig, detail: e.target.value })
                  }
                  type={"text"}
                  defaultValue={postConfig.detail}
                  resize="none"
                ></textarea>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  ////////////////////////////////////////

  //////////// Logica de Likes ////////////
  function handleLike(e) {
    e.preventDefault();
    function checkLocateCard() {
      if (locate === "myProfile") {
        dispatch(getPostMyProfile([auth.currentUser.uid]));
      } else if (locate === "userProfile") {
        dispatch(getPostUserProfile([creator]));
      } else if (locate === "home") {
        const arrayIds = myProfile.followings.map((el) => el.autorId);

        dispatch(getPost(arrayIds.concat(myProfile.id)));
      }
    }

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
        console.log("Funcion like error", error);
      });
    // .then((id) => {
    //   console.log('array de likes ', id)
    // })
  }
  // console.log("aqui likes", likes);

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
  ////////////////////////////////////////
  return (
    <div className={styles.cardbody}>
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
          {useUser[0].username ? <h4>{useUser[0].username}</h4> : <h2>User</h2>}
        </div>
      </header>

      <Link to={`/user/${creator}`} className={styles.cardData}>
        <img className={styles.img} src={photo}></img>
      </Link>

      <div className={styles.cabeza}>
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
          {auth.currentUser.uid === creator && (
            <button
              className={styles.btnCommit}
              onClick={() => {
                setPostConfig({ ...postConfig, view: !postConfig.view });
              }}
            >
              {" "}
              <HiDotsHorizontal />{" "}
            </button>
          )}
          {/* Ventana Modal con opciones para borrar y editar post*/}{" "}
          {postConfig.view ? configPost() : false}
        </section>

        <section className={styles.datePosted}>
          {" "}
          {reverse(createdAt.substring(0, 10))}{" "}
        </section>
      </div>

      <section className={styles.likes}>{likes.length} Me gusta </section>

      <section className={styles.description}> {detail} </section>

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
        <button
          onClick={
            inputComment.length > 0 ? (e) => handleComment(e) : undefined
          }
          className={
            inputComment.length > 0
              ? styles.btnComment
              : `${styles.btnComment} ${styles.btnCommentDisabled}`
          }
        >
          Publicar
        </button>
      </div>

      {commentSlice
        ? commentSlice.map((com) => {
            return (
              <div key={com.id} className={styles.commentBox}>
                {com?.detail && Render(com.userId, com.detail)}
              </div>
            );
          })
        : false}
      {load === true ? (
        <div className={styles.load}>
          <img src={loading} alt="" />
        </div>
      ) : (
        false
      )}
      <div className={styles.btnVerComBox}>
        {commentSorted?.length > 2 ? renderBtnVer() : false}
      </div>
      {/* <button onClick={() => console.log(commentSlice)}> AUX</button> */}
      {/* <button onClick={() => console.log(comment.comment)}> ALL COMMENT</button> */}
    </div>
  );
}
