import React from "react";
import { Link } from "react-router-dom";
import {MdIosShare} from 'react-icons/md';
import {HiDotsHorizontal} from 'react-icons/hi';
import styles from './Card.module.scss'
const img ='https://static.eldiario.es/clip/71d118ff-5ef2-449c-be8a-6c321304fa70_16-9-aspect-ratio_default_0.jpg'


export default function Card () {
    return (
        <div className={styles.cardbody}>
            <div className={styles.cardData}>
                <nav to='/home'>    {/* TODO cambiar a link */}
                    <img className={styles.img} src={img}></img>
                </nav>
                <nav className={styles.over}>
                    <button className={styles.btn}>boton</button>
                    <button className={styles.btnShare}> <MdIosShare/> </button>
                    <button className={styles.btnCommit}> <HiDotsHorizontal/> </button>
                </nav>
            </div>
            <div className={styles.cardText}>
                <h4>Autor</h4>
                <p>Conteo de likes</p>
            </div>

            
        </div>
    )

};