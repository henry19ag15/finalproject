import React, { useState } from "react";
import styles from "./NavBar.module.scss";
import { GoThreeBars } from "react-icons/go";
import { BiSearchAlt, BiMessageRoundedDetail } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import logo from "./imgs/logo2.png";
import noimg from "../../sass/noimg.png";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useHistory } from "react-router-dom";

const NavBar = () => {
  const auth = getAuth();

  const user = auth.currentUser;
  const [navActive, setNavActive] = useState(false);

  function handleGoProfile(e) {
    e.prenventDefault();
    setNavActive(false);
  }

  return (
    <div className={styles.NavBar}>
      <nav className={styles.Nav}>
        <Link className={styles.logo} to="/">
          {" "}
          <img src={logo} />
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
          <Link
            to="/profile"
            onClick={()=>setNavActive(false)}
            className={styles.menuItem}
          >
            {" "}
            {user.photoURL ? (
              <img src={user.photoURL} alt="" />
            ) : (
              <img src={noimg} alt="" />
            )}
          </Link>
        </ul>
        <button
          className={styles.btn_toogle}
          onClick={() => setNavActive(!navActive)}
        >
          <GoThreeBars />
        </button>
      </nav>
    </div>
  );
};

export default NavBar;
