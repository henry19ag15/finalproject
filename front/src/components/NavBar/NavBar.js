import React, {useState} from 'react';
import styles from './NavBar.module.css';
import {GoThreeBars} from 'react-icons/go';


const NavBar = () => {

    const [navActive, setNavActive] = useState(false);

    return (
        <div className={styles.NavBar}>
            <nav className={styles.Nav}>
                <span className={styles.logo}>LOGO</span>
                <ul className={navActive?styles.NavMenu:`${styles.NavMenu} ${styles.disable}`} >
                    <li className={styles.searchBar}>
                        <input
                            className={styles.input}
                            type='text'
                            placeholder='Buscar...'
                        >
                        </input>
                        <button 
                            className={styles.btn}
                            type='submit'
                        >
                            Search
                        </button>
                    </li>
                    <li className={styles.menuItem}>Notificacion</li>
                    <li className={styles.menuItem}>Perfil</li>
                </ul>
                <button className={styles.btn_toogle}
                onClick={()=>setNavActive(!navActive)}
                >
                    <GoThreeBars/>
                </button>
            </nav>
        </div>
    )
}


export default NavBar