import React, { useState } from "react";
import { useSelector } from "react-redux";
import style from "./FollowModalOtherProfile.module.scss";
import { getAuth } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../../Redux/02-actions";
import noimg from "../../sass/noimg.png"

export default function FollowModalOtherProfile({
  setFollowActive,
  followActive,
}) {
  const dispatch = useDispatch();

  const auth = getAuth();
  const history = useHistory();
  const user = useSelector((state) => state.allUser);
  var urlActual = window.location.pathname;
  urlActual = urlActual.slice(6, urlActual.length);
  const profileUser = user.filter((e) => e.id === urlActual);
  const followers = profileUser[0].followers.map((e) =>
    user.filter((el) => el.id === e.autorId)
  );
  const following = profileUser[0].followings.map((e) =>
    user.filter((el) => el.id === e.autorId)
  );

  // console.log("followers ", followers);
  // console.log("following ", following);

  const [followView, setFollowView] = useState(followActive.type);

  function handleSelect(e) {
    if (auth.currentUser.uid === e) {
      return history.push(`/profile`);
    } else {
      dispatch(getUserProfile(e));
      setFollowActive({ ...followActive, view: false });

      return history.push(`/user/${e}`);
    }
  }

  function FollowRender() {
    if (followView === "followers") {
      return (
        <div className={style.FollowBox}>
          {followers.map((e) =>
            e.length > 0 ? (
              <button  key={e[0].id} onClick={() => handleSelect(e[0].id)}>
                <img src={e[0].profilephoto ? e[0].profilephoto : noimg} alt=""></img>
                <p>{e[0].username}</p>
              </button>
            ) : (
              false
            )
          )}
        </div>
      );
    } else if (followView === "following") {
      return (
        <div className={style.FollowBox}>
          {following.map((e) =>
            e.length > 0 ? (
              <button  key={e[0].id} onClick={() => handleSelect(e[0].id)}>
                <img src={e[0].profilephoto ? e[0].profilephoto : noimg} alt=""></img>
                <p>{e[0].username}</p>
              </button>
            ) : (
              false
            )
          )}
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
