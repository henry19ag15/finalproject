import React from "react";
import { Link } from "react-router-dom";
import {MdIosShare} from 'react-icons/md';
import {HiDotsHorizontal} from 'react-icons/hi';
import {FiHeart} from 'react-icons/fi';
import styles from './Card.module.scss'
import { getAuth } from "firebase/auth";
import noimg from '../../sass/noimg.png';
const img ='https://static.eldiario.es/clip/71d118ff-5ef2-449c-be8a-6c321304fa70_16-9-aspect-ratio_default_0.jpg'


export default function Card () {
    const auth = getAuth();

    const user = auth.currentUser;

    return (
        <div className={styles.cardbody}>
            <div className={styles.cardData}>
                <nav to='/home'>    {/* TODO cambiar a link */}
                    <img className={styles.img} src={img}></img>
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
                    {user.photoURL?(<img src={user.photoURL} alt="" />):(<img src={noimg} alt="" />)}
                </Link>
                <div className={styles.profileName}> 
                    {" "}
                    {user.displayName?(<h4>{user.displayName}</h4>): (<h2>User</h2>)}
                 </div>
            </header>


            <section className={styles.likes}> <p>Conteo de likes</p> </section>
            <section className={styles.description}> <p>Descripción</p> </section>
            
        </div>
    )

};


