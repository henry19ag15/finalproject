import React, { useState } from "react";
import styles from "./NavBar.module.scss";
import { GoThreeBars } from "react-icons/go";
import { Link } from "react-router-dom";
import { BiSearchAlt, BiMessageRoundedDetail } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { getAuth, signOut } from "firebase/auth";
import { CgProfile } from "react-icons/cg";
import logo from "../../assets/logo3.png";
import noimg from "../../sass/noimg.png";
import swal from "sweetalert";

import { useHistory } from "react-router-dom";
import { Sling as Hamburger } from 'hamburger-react'
import Post from "../Post/Post";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";

const NavBar = () => {
  const auth = getAuth();
  const history = useHistory();
  const user = auth.currentUser;
  const [navActive, setNavActive] = useState(false);
  //const [configNav, setConfigNav] = useState(false);


  function handleLogout(e) {
    swal({
      title: "Cerrar sesion",
      text: "¿Seguro que quieres cerrar sesion?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        signOut(auth)
          .then(() => {
            // Sign-out successful.
            console.log("deslogueaste");
            history.push("/");
          })
          .catch((error) => {
            // An error happened.
          });
      } else {
        return;
      }
    });
  }

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
          <li className={styles.add}>
            <Post/>
          </li>



          {/* <Link
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
          </Link> */}



          <div lassName={styles.menuPerfil}>
            <button
              //to="/profile"
              onClick={(e) => setNavActive(!navActive)}
              //className={styles.menuItem}
              className={navActive ? styles.menuItem : `${styles.menuItem} ${styles.btnRotate}`}
                        >
              {" "}
              {user.photoURL ? (
                <img  className='user-img' src={user.photoURL} alt="" />
              ) : (
                <img className='user-img' src={noimg} alt="" />
              )}
            </button>
          </div>




          <body>
            <div
              className={
                navActive
                  ? styles.menuHidden
                  : `${styles.menuHidden} ${styles.disable}`
              }
                      >
              
                <button href="/profile" /* onClick={(e) => handleClickConfig(e)} */>
                Perfil 
                </button>
              
              <button className={styles.btnLogout} onClick={(e) => handleLogout(e)}>
                Cerrar sesion
              </button>
            </div>
          </body>



        

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
