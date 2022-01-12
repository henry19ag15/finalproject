import { useEffect, useState } from "react";
import {useDispatch} from 'react-redux';
import {getAllUser} from '../../Redux/02-actions/index';
import NavBar from "../NavBar/NavBar";
import Card from "../Card/Card";
import styles from "./Home.module.css";

export default function Home() {
    //const [picsPerPage, setPicsPerPage] = useState(8);
const dispatch= useDispatch()

useEffect(()=>{
 dispatch(getAllUser())
},[])


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


        </div>
    </div>
    );
}
