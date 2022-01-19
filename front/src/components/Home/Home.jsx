import { useState } from "react";
import NavBar from "../NavBar/NavBar";
import Card from "../Card/Card";
import styles from "./Home.module.css";

export default function Home() {
<<<<<<< HEAD
  //const [picsPerPage, setPicsPerPage] = useState(8);
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = auth.currentUser;
  const perfil = useSelector((state) => state.myProfile);
  const allUser = useSelector((state) => state.allUser);
  const posts = useSelector((state) => state.posts);
  const userPost = posts.sort((a, b) => {
    if (a.createdAt < b.createdAt) return 1;
    if (a.createdAt > b.createdAt) return -1;
    return 0;
  });

  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getMyProfile(user.uid));
  }, []);

  function aux(e) {
    e.preventDefault();
    console.log(perfil.following);
    const idToGet = perfil.following.concat(user.uid);
    dispatch(getPost(idToGet));
  }

  /* useEffect(()=>{
    console.log("Esto es lo que llega",perfil.following)
},[perfil]) */

  function aux2(id) {
    const validate = allUser.filter((e) => e.id === id);
    if (validate.length > 0) {
      return true;
    } else {
      return false;
    }
  }
=======
    //const [picsPerPage, setPicsPerPage] = useState(8);

    return (
    <div className={styles.home}>
        {/* <NavBar /> */}

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
>>>>>>> d54904ae95fdfa36e35268206e0ff0962909a47f


        </div>
    </div>
    );
}
