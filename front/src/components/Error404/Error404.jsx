import React from "react";
import { Link } from "react-router-dom";
import style from './Error404.module.scss'

export default function Error404(){

    return <div className={style.todoError}>
        <h2>Error 404</h2>
        <h3>No se encontro la ruta solicitada</h3>
        <Link to="/">Volver al home</Link>
    </div>
}