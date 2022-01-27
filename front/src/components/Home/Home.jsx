import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUser,
  getMyProfile,
  getPost,
} from "../../Redux/02-actions/index";
import NavBar from "../NavBar/NavBar";
import Card from "../Card/Card";
import styles from "./Home.module.css";
import { getAuth } from "firebase/auth";
import LazyLoad from "react-lazyload";

export default function Home() {
  //const [picsPerPage, setPicsPerPage] = useState(8);
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = auth.currentUser;
  // const perfil = useSelector((state) => state.myProfile);
  const allUser = useSelector((state) => state.allUser);
  const posts = useSelector((state) => state.posts);
  const userPost = posts.sort((a, b) => {
    if (a.createdAt < b.createdAt) return 1;
    if (a.createdAt > b.createdAt) return -1;
    return 0;
  });

  const [followin, setFollowin] = useState({ array: [] })


  // console.log(userPost)
  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getMyProfile(user.uid)).then((res) => {
      console.log(res);
      const arrayIds = res.payload.followings.map((el) => el.autorId);
      setFollowin({ array: arrayIds })
      dispatch(getPost(arrayIds.concat(user.uid))).catch((err) =>
        console.log(err)
      );
    }).catch(err => console.log(err));
  }, []);

  function parcheValidador(id) {
    //
    const validate = allUser.filter((e) => e.id === id);
    if (validate.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className={styles.home}>
      {/* <NavBar /> */}
      <div className={styles.container}>
        {userPost?.map((el) =>
          parcheValidador(el.autorId) ? (
            <LazyLoad height={488} offset={5} key={el.id}>
              <Card
                locate="home"
                id={el.id}
                key={el.id}
                photo={el.photo}
                detail={el.detail}
                creator={el.autorId}
                likes={el.likes}
                createdAt={el.createdAt}
              />
            </LazyLoad>
          ) : (
            false
          )
        )}
      </div>
      {followin.array.length > 0 ? true :
        <div className={styles.noneFollowins}>
          <h1>No sigues a nadie todavia!</h1>
          <h3>Empieza a seguir gente para poder ver sus publicaciones en el inicio</h3>
        </div>}

    </div>
  );
}
