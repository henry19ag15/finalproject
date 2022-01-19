import { useState } from "react";
import NavBar from "../NavBar/NavBar";
import Card from "../Card/Card";
import styles from "./Home.module.css";

export default function Home() {
<<<<<<< HEAD
    //const [picsPerPage, setPicsPerPage] = useState(8);

    return (
    <div className={styles.home}>
        {/* <NavBar /> */}
=======
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
console.log(userPost)
  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getMyProfile(user.uid)).then((res) => {
      console.log(res);
      const arrayIds = res.payload.followings.map((el) => el.autorId);
      dispatch(getPost(arrayIds.concat(user.uid))).catch((err) =>
        console.log(err)
      );
    }).catch(err=>console.log(err));
  }, []);
>>>>>>> 53f7c534eb800479ba9b7d0df2b20ac74e21a8b9

        <div className={styles.container}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />

<<<<<<< HEAD

        </div>
=======
  return (
    <div className={styles.home}>
      {/* <NavBar /> */}
      <div className={styles.container}>
        {userPost?.map((el) =>
          parcheValidador(el.autorId) ? (
            // <LazyLoad height={488} offset={10}>
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
            //  </LazyLoad> 
          ) : (
            false
          )
        )}
      </div>
>>>>>>> 53f7c534eb800479ba9b7d0df2b20ac74e21a8b9
    </div>
    );
}
