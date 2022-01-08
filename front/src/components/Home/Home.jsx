import { useState } from "react";
import NavBar from "../NavBar/NavBar";
import Card from "./Card";
import styles from "./Home.module.css";

export default function Home() {
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


        </div>
    </div>
    );
}
