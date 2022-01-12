import React, { useState } from "react";
import styles from "./NavBar.module.scss";
import { GoThreeBars } from "react-icons/go";
import { BiSearchAlt, BiMessageRoundedDetail } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import logo from "../../assets/logo3.png";
import noimg from "../../sass/noimg.png";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { Sling as Hamburger } from 'hamburger-react'
import Post from "../Post/Post";

const NavBar = () => {
  const auth = getAuth();

  const user = auth.currentUser;
  const [navActive, setNavActive] = useState(false);

  // const btnMenu = document.querySelector('styles.menuImg');
  // const menu = document.querySelector('containerSubMenu');

  // const handleClick = () => {
  //   btnMenu.addEventListener('click', function (){
  //     menu.classList.toggle('mostrar')
  //   })
  // }


  function handleGoProfile(e) {
    e.prenventDefault();
    setNavActive(false);
  }

  return (
    <div className={styles.NavBar}>
      <nav className={styles.Nav}>
        <Link className={styles.logo} to="/">
          <img src={logo} alt='logo' />
        </Link>
        <ul
          className={
            navActive ? styles.NavMenu : `${styles.NavMenu} ${styles.disable}`
          }
        >
          <li className={styles.searchBar}>
            <input
              className={styles.input}
              type="text"
              placeholder="Buscar..."
            ></input>
            <button className={styles.btn} type="submit">
              <BiSearchAlt />
            </button>
          </li>
          <li className={styles.menuItem}>
            {" "}
            <IoMdNotificationsOutline />{" "}
          </li>
          <li className={styles.menuItem}>
            {" "}
            <BiMessageRoundedDetail />{" "}
          </li>
<<<<<<< HEAD


            <div
              //to="/profile"
              // onClick={()=>setNavActive(false)}
              className={styles.menuImg}
              onClick={() => setNavActive(!navActive)}
            >
              {" "}
              {user.photoURL ? (
                <img src={user.photoURL} alt="" size={30}toggled={navActive} toggle={setNavActive} />
              ) : (
                <img src={noimg} alt="" />
                )} 

                <li className={styles.containerSubMenu}>
                  <ul className={
                    navActive ? styles.subMenu : `${styles.subMenu} ${styles.mostrar}`
                  }
                  /* {styles.subMenu} */ >
                    <a href={'/profile'} className={styles.subMenuLink}> Perfil </a>
                    <a href={'/profile'} className={styles.subMenuLink}> Perfil2 </a>
                    <a href={'/profile'} className={styles.subMenuLink}> Perfil2 </a>
                  </ul>
                </li>
            </div>
          


=======
          <li className={styles.add}>
            <Post/>
          </li>
          <Link
            to="/profile"
            onClick={()=>setNavActive(false)}
            className={styles.menuItem}
          >
            {" "}
            {user.photoURL ? (
              <img  className='user-img' src={user.photoURL} alt="" />
            ) : (
              <img className='user-img' src={noimg} alt="" />
            )}
          </Link>
>>>>>>> f9ed19cf1838d0e4a2a5a61c6a74fdf5b3ba0289
        </ul>
        <button
          className={styles.btn_toogle}
          onClick={() => setNavActive(!navActive)}
        >
          <Hamburger  size={30}toggled={navActive} toggle={setNavActive} />
        </button>
      </nav>
    </div>
  );
};

export default NavBar;
