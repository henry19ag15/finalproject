import React, { useState } from "react";
import { useSelector } from "react-redux";
import style from "./FollowModal.module.scss";
import { getAuth } from "firebase/auth";
import { useHistory } from "react-router-dom";

export default function FollowModal({ setFollowActive, followActive }) {
  const auth = getAuth();
  const history = useHistory();
  const user = useSelector((state) => state.allUser);
  const myuser = useSelector((state) => state.myProfile);
  const followers = myuser.followers.map((e) =>
    user.filter((el) => el.id === e.autorId)
  );
  const following = myuser.followings.map((e) =>
    user.filter((el) => el.id === e.autorId)
  );
  // console.log("followers en 0", followers[0]);
  // console.log("following en 0", following[0]);

  const [followView, setFollowView] = useState(followActive.type);

  function handleSelect(e) {
    if (auth.currentUser.uid === e) {
      return history.push(`/profile`);
    } else {
      return history.push(`/user/${e}`);
    }
  }

  function FollowRender() {
    if (followView === "followers") {
      return (
        <div className={style.FollowBox}>
          {followers.map((e) => (
            <button key={e[0].id} onClick={() => handleSelect(e[0].id)}>
              <img src={e[0].profilephoto} alt="" />
              <p>{e[0].username}</p>
            </button>
          ))}
        </div>
      );
    } else if (followView === "following") {
      return (
        <div className={style.FollowBox}>
          {following.map((e) => (
            <button key={e[0].id} onClick={() => handleSelect(e[0].id)}>
              <img src={e[0].profilephoto} alt="" />
              <p>{e[0].username}</p>
            </button>
          ))}
        </div>
      );
    }
  }

  return (
    <div className={style.FollowModal}>
      <div className={style.card}>
        <div className={style.head}>
          <h3>{followView === "followers" ? "Seguidores" : "Seguidos"}</h3>
          <button
            className={style.buttonClose}
            onClick={(e) => setFollowActive(false)}
          >
            X
          </button>
        </div>
        <div className={style.btnBox}>
          <button
            className={followView === "followers" ? style.btnActive : ""}
            onClick={(e) => setFollowView("followers")}
          >
            Seguidores
          </button>
          <button
            className={followView === "following" ? style.btnActive : ""}
            onClick={(e) => setFollowView("following")}
          >
            Seguidos
          </button>
        </div>
        {FollowRender()}
      </div>
    </div>
  );
}
