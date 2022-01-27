import React, { useEffect, useState } from "react";
import style from "./CardLink.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { getPost, getPostFromId } from "../../Redux/02-actions";
import LoadingPage from "../LoadingPage/LoadingPage";
import Error404 from "../Error404/Error404";
import noimg from "../../sass/noimg.png";
import { BsFillHeartFill } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { HiDotsHorizontal } from "react-icons/hi";
import swal from "sweetalert";
import { getPostMyProfile } from "../../Redux/02-actions";

export default function CardLink({ id, locate, detail, likes, createdAt }) {
  const dispatch = useDispatch();
  const auth = getAuth();
  const history = useHistory();
  const users = useSelector((state) => state.allUser);
  const posts = useSelector((state) => state.postsFromId);
  const myProfile = useSelector((state) => state.myProfile);
  const profile = useSelector((state) => state.allUser);
  const useUser = profile.filter((el) => el.id === posts.autorId);
console.log(useUser)
  const [load, setLoad] = useState(0);

  var URLactual = window.location.pathname;
  const newStr = URLactual.slice(6, URLactual.length);

  //   useEffect(() => {}, [posts]);

  useEffect(() => {
    dispatch(getPostFromId(newStr))
      .then((res) => {
        console.log("esto es res", res);
        setLoad(1);
      })
      .catch((err) => {});
    setLoad(2);
  }, []);

  const [postConfig, setPostConfig] = useState({
    view: false,
    edit: false,
    detail: posts.detail,
  });

  //////////// Logica de Likes ////////////
  function handleLike(e) {
    e.preventDefault();

    function checkLocateCard() {
      dispatch(getPostFromId(posts.id))
        .then((res) => {
          console.log("esto es res", res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    axios
      .post(`https://pruebaconbackreal-pg15.herokuapp.com/posts/likes/`, {
        idUser: auth.currentUser.uid,
        idPost: posts.id,
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
    const viewIdLikes = posts.likes?.filter(
      (like) => like.userId === auth.currentUser.uid
    );

    if (viewIdLikes.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  ////////////////////////////////////////

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
            `https://pruebaconbackreal-pg15.herokuapp.com/posts/destroy/${posts.id}`
          )
          .then(() => {
            setLoad(false);
            setPostConfig({ ...postConfig, view: false, edit: false });
            dispatch(getPostFromId(posts.id));
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
              `https://pruebaconbackreal-pg15.herokuapp.com/posts/setting/${posts.id}`,
              { payload: { id: posts.id, detail: postConfig.detail } }
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
      <div className={style.editBox}>
        <div className={style.card}>
          <div className={style.head}>
            <button
              onClick={(e) =>
                setPostConfig({ ...postConfig, view: false, edit: false })
              }
              className={style.buttonClose}
            >
              X
            </button>
          </div>
          {postConfig.edit === false ? (
            <div className={style.bodycardnoedit}>
              <button className={style.cancelar} onClick={() => deletePost()}>
                Eliminar post
              </button>
              <button onClick={() => editPost(true)}>Editar post</button>
            </div>
          ) : (
            <div className={style.bodycard}>
              <div className={style.btnBox}>
                <button
                  className={style.cancelar}
                  onClick={() => editPost(false)}
                >
                  Cancelar edicion
                </button>
                <button onClick={() => submitEditPost()}>Confirmar</button>
              </div>
              <div className={style.inputBox}>
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
      <button className={style.btnVerMas} onClick={() => handleVerMas()}>
        Ver mas comentarios...
      </button>
    ) : (
      <button className={style.btnVerMenos} onClick={() => handleVerMenos()}>
        ...Ocultar comentarios
      </button>
    );
  }

  useEffect(() => {
    axios
      .get(
        `https://pruebaconbackreal-pg15.herokuapp.com/comment/bringscomments/${newStr}`
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
        idPost: posts.id,
        detail: inputComment,
      })
      .then((res) => {
        console.log("res 1", res);
        setInputComment("");
        axios
          .get(
            `https://pruebaconbackreal-pg15.herokuapp.com/comment/bringscomments/${newStr}`
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
    const userFromComment = profile?.filter((user) => user.id === id);

    return (
      <div className={style.photoNameBox}>
        <div className={style.imgBox}>
          {userFromComment[0]?.profilephoto ? (
            <img src={userFromComment[0].profilephoto} alt="" />
          ) : (
            <img src={noimg} alt=""></img>
          )}
        </div>
        <div className={style.commentTextBox}>
          {userFromComment[0]?.username ? (
            <p className={style.name}>{userFromComment[0].username}</p>
          ) : (
            <p className={style.name}>Nombre no encontrado</p>
          )}
          <p>{Comment}</p>
        </div>
      </div>
    );
  }

  function RenderMain() {
    return (
      <div className={style.allCardLink}>
        <div className={style.maxCard}>
          <div className={style.btnCloseBox}>
            <button></button>
          </div>
          <div className={style.imgPanelContainer}>
            <div className={style.imageBox}>
              <img src={posts.photo} alt="" />
            </div>
            <div className={style.panelBox}>
              <header>
                <h4>{useUser[0]?.username}</h4>
                <img src={noimg} alt="" />
              </header>

              {/* /////////// ESTRUCTURA LIKE ///////////    */}
              <div className={style.cabeza}>
                <section className={style.btnBar}>
                  <button
                    className={
                      likeValidate()
                        ? ` ${style.btnLike} ${style.colorLike}`
                        : style.btnLike
                    }
                    onClick={(e) => handleLike(e)}
                  >
                    {" "}
                    {likeValidate() ? <BsFillHeartFill /> : <FiHeart />}{" "}
                  </button>
                  {auth.currentUser.uid === posts && (
                    <button
                      className={style.btnCommit}
                      onClick={() => {
                        setPostConfig({
                          ...postConfig,
                          view: !postConfig.view,
                        });
                      }}
                    >
                      {" "}
                      <HiDotsHorizontal />{" "}
                    </button>
                  )}
                  {/* Ventana Modal con opciones para borrar y editar post*/}{" "}
                  {postConfig.view ? configPost() : false}
                </section>

                <section className={style.datePosted}>
                  {" "}
                  {reverse(posts.createdAt.substring(0, 10))}{" "}
                </section>
              </div>
              {/* /////////// ESTRUCTURA CUANTOS LIKES  ///////////    */}

              <section className={style.likes}>
                {posts.likes?.length} Me gusta{" "}
              </section>

              <section className={style.description}> {posts.detail} </section>
              {/* /////////// ESTRUCTURA HACER COMMENT ///////////    */}

              <div className={style.inputCommentBox}>
                <input
                  className={style.input}
                  type="test"
                  name="comment"
                  placeholder="Agregar comentario..."
                  onChange={(e) => handleChange(e)}
                  autoComplete="off"
                  value={inputComment}
                ></input>
                <button
                  onClick={
                    inputComment.length > 0
                      ? (e) => handleComment(e)
                      : undefined
                  }
                  className={
                    inputComment.length > 0
                      ? style.btnComment
                      : `${style.btnComment} ${style.btnCommentDisabled}`
                  }
                >
                  Publicar
                </button>
              </div>

              {/* /////////// ESTRUCTURA COMMENT ///////////    */}
              <div className={style.commenOverlay}>

              {commentSlice
                ? commentSlice.map((com) => {
                    return (
                        <div key={com.id} className={style.commentBox}>
                        {com?.detail && Render(com.userId, com.detail)}
                      </div>
                    );
                })
                : false}
              <div className={style.btnVerComBox}>
                {commentSorted?.length > 2 ? renderBtnVer() : false}
              </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (load === 0) {
    return <LoadingPage />;
  } else if (load === 1) {
    return RenderMain();
  } else {
    return <Error404 />;
  }
}
