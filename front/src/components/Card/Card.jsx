import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  const useUser = profile.filter((el) => el.id === creator);
  //console.log("esto es el user: ", useUser);
  // console.log(useUser[0].username);
  // console.log("es id ", id);
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
  console.log("comentario", comment.comment);
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

        console.log({
          idUser: auth.currentUser.uid,
          idPost: id,
          detail: inputComment,
        });
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
    axios.delete(
      `https://pruebaconbackreal-pg15.herokuapp.com/posts/destroy/${id}`
    );
  }
  let contador = 0;

  function editPost(e) {
    if (e === true) {
      setPostConfig({ ...postConfig, edit: true });
    } else {
      setPostConfig({ ...postConfig, edit: false, view: false });
    }
  }

  async function submitEditPost() {
    await axios.put(
      `https://pruebaconbackreal-pg15.herokuapp.com/posts/setting/${id}`,
      { payload: { id: id, detail: postConfig.detail } }
    );
    setPostConfig({ ...postConfig, edit: false, view: false });
  }

  function configPost() {
    return (
      <div>
        <button onClick={() => deletePost()}>Eliminar post</button>
        {postConfig.edit === false ? (
          <button onClick={() => editPost(true)}>Editar post</button>
        ) : (
          <button onClick={() => editPost(false)}>Cancelar edicion</button>
        )}
      </div>
    );
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
  console.log("aqui likes", likes);

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

      <Link  to={`/user/${creator}`} className={styles.cardData}>
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
          {/* Botones de borrar post y editar post -----> */}{" "}
          {postConfig.view ? configPost() : false}
        </section>

        <section className={styles.datePosted}>
          {" "}
          {reverse(createdAt.substring(0, 10))}{" "}
        </section>
      </div>

      <section className={styles.likes}>{likes.length} Me gusta </section>

      {postConfig.edit === false ? (
        <section className={styles.description}> {detail} </section>
      ) : (
        <div>
          <button onClick={() => submitEditPost()}>Confirmar</button>
          <input
            onChange={(e) =>
              setPostConfig({ ...postConfig, detail: e.target.value })
            }
            type={"text"}
            defaultValue={postConfig.detail}
          ></input>
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

      {comment.comment
        ? comment.comment.map((com) => {
            return (
              <div className={styles.commentBox}>
                {com?.detail && Render(com.userId, com.detail)}
              </div>
            );
          })
        : false}
    </div>
  );
}
