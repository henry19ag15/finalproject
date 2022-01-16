import React from "react";
import { Link } from "react-router-dom";
import { MdIosShare } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { FiHeart } from "react-icons/fi";
import styles from "./Card.module.scss";
import { getAuth } from "firebase/auth";
import noimg from "../../sass/noimg.png";
import { useSelector } from "react-redux";
const img ='https://static.eldiario.es/clip/71d118ff-5ef2-449c-be8a-6c321304fa70_16-9-aspect-ratio_default_0.jpg'


export default function Card ({id, photo, creator, likes, detail}) {
    const auth = getAuth();

    const profile = useSelector(state => state.allUser)


    const user = auth.currentUser;

    const useUser=  profile.filter(el => el.id === creator) 
    console.log("esto es el user: ", useUser)
    console.log(useUser[0].username)

    return (
        <div className={styles.cardbody}>
            <div className={styles.cardData}>
                <nav to='/home'>    {/* TODO cambiar a link */}
                    <img className={styles.img} src={photo}></img>
                </nav>
            </div>

            <section className={styles.btnBar}>
                    <button className={styles.btnLike}> <FiHeart/> </button>
                    <button className={styles.btnCommit}> <HiDotsHorizontal/> </button>
                    <button className={styles.btnShare}> <MdIosShare/> </button>
            </section>
            <header className={styles.cardProfile}> 
                <Link
                    to="/profile"
                    //onClick={()=>setNavActive(false)}
                    className={styles.profilePhoto}
                >
                    {" "}
                    {useUser[0].profilephoto?(<img src={useUser[0].profilephoto} alt="" />):(<img src={noimg} alt="" />)}
                </Link>
                <div className={styles.profileName}> 
                    {" "}
                    {useUser[0].username?(<h4>{useUser[0].username}</h4>): (<h2>User</h2>)}
                 </div>
            </header>


            <section className={styles.likes}> {likes.length} likes </section>
            <section className={styles.description}> {detail} </section>
            <input 
                className={styles.input}
                type="test"
                name="comment"
                placeholder="Agregar comentario..."
                >
            </input>
            <button className={styles.btnComment}>Publicar</button>
            
        </div>
    )

  const useUser = profile.filter((el) => el.id === creator);
  // console.log(useUser)

  function linkInPhoto() {
    if (creator === auth.currentUser.uid) {
      return `/profile`;
    } else {
      return `/user/${creator}`;
    }
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

      <section className={styles.likes}>
        {" "}
        <p>Conteo de likes</p> {likes.length}{" "}
      </section>
      <section className={styles.description}>
        {" "}
        <p>Descripción</p>
        {detail}{" "}
      </section>
    </div>
  );
}
