import { useEffect, useState } from "react";
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

  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getMyProfile(user.uid)).then((res) => {
      // console.log(res.payload.following);
      dispatch(getPost(res.payload.following.concat(user.uid)));
    });
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
          parcheValidador(el.creator) ? (
            <Card
              id={el.id}

              key={el.id}
              photo={el.photo}
              detail={el.detail}
              creator={el.creator}
              likes={el.likes}
              createdAt={el.createdAt}
            />
          ) : (
            false
          )
          )}
      </div>
    </div>
  );
}
