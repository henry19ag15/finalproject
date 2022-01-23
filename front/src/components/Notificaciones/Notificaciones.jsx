import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserProfile } from "../../Redux/02-actions";
import style from "./Notificaciones.module.scss";

export default function Notificaiones() {
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.myProfile);
  const notifySorted = myProfile?.notifications?.sort((a, b) => {
    if (a.createdAt < b.createdAt) return 1;
    if (a.createdAt > b.createdAt) return -1;
    return 0;
  });
  // console.log("sorted", notifySorted)
  const users = useSelector((state) => state.allUser);
  const history = useHistory();

  function handleBtnNotification(detail, autorId) {
    console.log(detail);
    if (detail === "Te ha empezado a seguir") {
      dispatch(getUserProfile([autorId])).then(() => {
        history.push("/user/" + autorId);
      });
    }
  }

  function render(detail, idUser, autorId) {
    const infoUser = users.filter((user) => user.id === idUser);
    // console.log("asd",infoUser)
    return (
      <button
        onClick={() => handleBtnNotification(detail, autorId)}
        className={style.cadaNotificaion}
      >
        {<img src={infoUser[0].profilephoto} alt="" />}
        <div className={style.textBox}>
          <h4>{infoUser[0].username} </h4>
          <p>{detail}</p>
        </div>
      </button>
    );
  }

  return (
    <div className={style.todoNotificaciones}>
      {/* <p>notificaiones</p> */}

      <ul>
        {notifySorted ? (
          notifySorted.map((noti) => (
            <li key={noti.id}>{render(noti.detail, noti.autor, noti.about)}</li>
          ))
        ) : (
          <p>No hay notificaiones</p>
        )}
      </ul>
    </div>
  );
}
