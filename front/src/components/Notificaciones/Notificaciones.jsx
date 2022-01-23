import React from "react";
import { useSelector } from "react-redux";
import style from "./Notificaciones.module.scss";

export default function Notificaiones() {
  const myProfile = useSelector((state) => state.myProfile);  
  const users = useSelector((state) => state.allUser);

  function render(detail,idUser) {
  const infoUser =  users.filter((user) => user.id === idUser);
console.log("asd",infoUser)
    return <div className={style.cadaNotificaion}>
        {<img src={infoUser[0].profilephoto} alt=""/>}
        <div className={style.textBox}>
        <h4>{infoUser[0].username}  </h4><p>{detail}</p>
        </div>
    </div>;
  }

  return (
    <div className={style.todoNotificaciones}>
      {/* <p>notificaiones</p> */}

      <ul>
        {myProfile.notifications?myProfile.notifications.map((noti) => (
          <li>{render(noti.detail, noti.autor)}</li>
        )):<p>No hay notificaiones</p>}
      </ul>
    </div>
  );
}
