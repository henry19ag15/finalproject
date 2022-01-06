import React from "react";
import { Link } from "react-router-dom";
const img ='https://static.eldiario.es/clip/71d118ff-5ef2-449c-be8a-6c321304fa70_16-9-aspect-ratio_default_0.jpg'


export default function Card () {
    return (
        <div className='{styles.card}'>
            <div  >
                <h1>Card</h1>
                <nav to='/home'>    {/* TODO cambiar a link */}
                    <img className="{styles.img}" alt={img}></img>
                </nav>
            </div>
            <div className="{styles.text}">
                <h2>perfil</h2>
                <h2>comentar</h2>
            </div>
        </div>
    )

};