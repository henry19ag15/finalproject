import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {getAllUser, getMyProfile, getPost} from '../../Redux/02-actions/index';
import NavBar from "../NavBar/NavBar";
import Card from "../Card/Card";
import styles from "./Home.module.css";
import {getAuth} from 'firebase/auth'

export default function Home() {
    //const [picsPerPage, setPicsPerPage] = useState(8);
const dispatch= useDispatch()
const auth = getAuth()
const user = auth.currentUser
const perfil = useSelector(state=>state.myProfile)
const posts = useSelector(state=>state.posts)
const userPost = posts.sort((a, b) => {
    if (a.createdAt < b.createdAt) return 1
    if (a.createdAt > b.createdAt) return -1
    return 0})

useEffect(()=>{
 dispatch(getAllUser())
 dispatch(getMyProfile(user.uid))
},[])



function aux (e){
    e.preventDefault()
    console.log(perfil.following)
   dispatch(getPost(perfil.following))
}

/* useEffect(()=>{
    console.log("Esto es lo que llega",perfil.following)
},[perfil]) */


    return (
    <div className={styles.home}>
        {/* <NavBar /> */}

        <div className={styles.container}>
            <button onClick={(e)=>{aux(e)}}>llamar</button>
        {
            userPost?.map(el => (
                <Card
                    key={el.id}
                    photo={el.photo}
                    detail={el.detail}
                    creator={el.creator}
                    likes={el.likes}
                    createdAt={el.createdAt}

                />
            ))
        }

        </div>
    </div>
    );
}
