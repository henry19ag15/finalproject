import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdIosShare } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { FiHeart } from "react-icons/fi";
import styles from "./Card.module.scss";
import { getAuth } from "firebase/auth";
import noimg from "../../sass/noimg.png";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
// const img =  "https://static.eldiario.es/clip/71d118ff-5ef2-449c-be8a-6c321304fa70_16-9-aspect-ratio_default_0.jpg";

export default function Card({ id, photo, creator, likes, detail }) {
  const auth = getAuth();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.allUser);
  // console.log("este es el id", id);
  // const user = auth.currentUser;
  
  const useUser = profile.filter((el) => el.id === creator);
  // console.log("esto es el user: ", useUser);
  // console.log(useUser[0].username);
  // console.log("es id ", id);

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
  // console.log("acacac", comment);
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
        setInputComment("")
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

  ////////////////////////////////////////

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
        </header>
        <section className={styles.btnBar}>
          <button className={styles.btnLike}>
            {" "}
            <FiHeart />{" "}
          </button>
          <button className={styles.btnCommit}>
            {" "}
            <HiDotsHorizontal />{" "}
          </button>
          <button className={styles.btnShare}>
            {" "}
            <MdIosShare />{" "}
          </button>
        </section>
      </div>

      <section className={styles.likes}> {likes.length} likes </section>
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
        <button onClick={(e) => handleComment(e)} className={styles.btnComment}>
          Publicar
        </button>
      </div>
      {/*  {comment.comment ? (
        <div className={styles.commentBox}>
          <div className={styles.photoNameBox}>
            {userFromComment[0]?.profilephoto && (
              <img src={userFromComment[0]?.profilephoto} alt="" />
            )}
            {userFromComment[0]?.username && (
              <p>{userFromComment[0].username}</p>
            )}
          </div>
          {comment.comment?.detail && <p className={styles.comentario}>{comment.comment.detail}</p>}
        </div>
      ) : (
        false
      )} */}

      {comment.comment
        ? comment.comment.map((com) => {
            return (
              <div className={styles.commentBox}>
                {render(com.idUser)}
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
