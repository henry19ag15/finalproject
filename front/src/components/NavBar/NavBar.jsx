import React, { useState } from "react";
import styles from "./NavBar.module.scss";
<<<<<<< HEAD
import { GoThreeBars } from "react-icons/go";
import { Link } from "react-router-dom";
import { BiSearchAlt, BiMessageRoundedDetail } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { getAuth, signOut } from "firebase/auth";
import { CgProfile } from "react-icons/cg";
=======
import { BiSearchAlt, BiMessageRoundedDetail } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { getAllUser } from "../../Redux/02-actions/index";
>>>>>>> 3bf7b92aa1f98a4b598f84f6552c99b042866ca0
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
<<<<<<< HEAD
  //const [configNav, setConfigNav] = useState(false);
=======
  const [inputSearch, setInputSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchToRender, setSearchToRender] = useState([]);
  console.log(allUser);
  const [searchResponsActive, setSearchResponsActive] = useState(false);
>>>>>>> 3bf7b92aa1f98a4b598f84f6552c99b042866ca0


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
<<<<<<< HEAD
=======
  // let searchToRender = [];
  function handleChangeInput(e) {
    setInputSearch(e.target.value);
    setSearchToRender(
      allUser.filter((user) =>
        user.username.toLowerCase().includes(inputSearch.toLowerCase())
      )
    );
    console.log("esto se renderiza", searchToRender);
  }

  function handleSelectUser(e, uid) {
    // e.preventDefault()
    // setInputSearch("");

    if (uid === user.uid) {
      history.push(`/profile`);
    } else {
      dispatch(getUserProfile(uid));
      history.push(`/user/${uid}`);
    }
  }
  function handleSelectUserResp(e, uid) {
    // e.preventDefault()

    if (uid === user.uid) {
      history.push(`/profile`);
    } else {
      dispatch(getUserProfile(uid));
      history.push(`/user/${uid}`);
    }
    setSearchResponsActive(false);
    setInputSearch("");
  }
  function handleBlur() {
    setTimeout(() => {
      setShowSearch(false);
    }, 200);
  }
  function handleOpenSearchRespons(e) {
    setNavActive(false);
    setSearchResponsActive(true);
  }
>>>>>>> 3bf7b92aa1f98a4b598f84f6552c99b042866ca0

  return (
    <div className={styles.NavBar}>
      <nav className={styles.Nav}>
        <Link className={styles.logo} to="/">
          <img src={logo} alt="logo" />
        </Link>
        {searchResponsActive ? (
          <div className={styles.searchBarRespons}>
            <div className={styles.inputBtnBox}>
              <input
                className={styles.inputRespons}
                type="text"              
                placeholder="Buscar..."
                onChange={(e) => handleChangeInput(e)}
                onBlur={() => handleBlur()}
                onFocus={() => setShowSearch(true)}
              ></input>

              <button className={styles.btnRespons} type="submit">
                <BiSearchAlt />
              </button>
            </div>
            <button
              onClick={() => setSearchResponsActive(false)}
              className={styles.btnCloseSearch}
            >
              x
            </button>
            <ul>
              {inputSearch.length > 1
                ? searchToRender.map((user) => (
                    <li key={user.id}>
                      <button onClick={(e) => handleSelectUserResp(e, user.id)}>
                        {user.profilephoto ? (
                          <img src={user.profilephoto} alt="" />
                        ) : (
                          <img src={noimg} alt="" />
                        )}
                        {user.username}
                      </button>
                    </li>
                  ))
                : false}
            </ul>
          </div>
        ) : (
          false
        )}

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
            <Post />
          </li>

<<<<<<< HEAD


          {/* <Link
=======
          <li>
            <button
              className={styles.btnOpenSearchInNavResp}
              onClick={(e) => handleOpenSearchRespons(e)}
            >
              <BiSearchAlt />
            </button>
          </li>

          <Link
>>>>>>> 3bf7b92aa1f98a4b598f84f6552c99b042866ca0
            to="/profile"
            onClick={()=>setNavActive(false)}
            className={styles.menuItem}
          >
            {" "}
            {user.photoURL ? (
              <img className="user-img" src={user.photoURL} alt="" />
            ) : (
              <img className="user-img" src={noimg} alt="" />
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
