import React, {useState} from 'react';
import styles from './NavBar.module.scss';
import {GoThreeBars} from 'react-icons/go';  import {BiSearchAlt, BiMessageRoundedDetail} from 'react-icons/bi'; import {IoMdNotificationsOutline} from 'react-icons/io';
import {CgProfile} from 'react-icons/cg';
import logo from './imgs/logo2.png'




const NavBar = () => {

    const [navActive, setNavActive] = useState(false);

    return (
        <div className={styles.NavBar}>
            <nav className={styles.Nav}>
                <img className={styles.logo} src={logo}></img>
                <ul className={navActive?styles.NavMenu:`${styles.NavMenu} ${styles.disable}`} >
                    <li className={styles.searchBar}>
                        <input
                            className={styles.input}
                            type='text'
                            placeholder= 'Buscar...'
                        >
                        </input>
                        <button 
                            className={styles.btn}
                            type='submit'
                        >
                            <BiSearchAlt/>
                        </button>
                    </li>
                    <li className={styles.menuItem}> <IoMdNotificationsOutline/> </li>
                    <li className={styles.menuItem}> <BiMessageRoundedDetail/> </li>
                    <li className={styles.menuItem}> <CgProfile/> </li>
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