import React, { useState, useEffect } from "react";
import styles from "./NavBar.module.scss";
import { GoThreeBars } from "react-icons/go";
import { BiSearchAlt, BiMessageRoundedDetail } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { getAllUser } from "../../Redux/02-actions/index";
import logo from "../../assets/logo.png";
import noimg from "../../sass/noimg.png";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { Sling as Hamburger } from "hamburger-react";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../../Redux/02-actions";

const NavBar = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = auth.currentUser;
  const allUser = useSelector((state) => state.allUser);
  const [navActive, setNavActive] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchToRender, setSearchToRender] = useState([]);
  console.log(allUser);

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  function handleGoProfile(e) {
    e.prenventDefault();
    setNavActive(false);
  }
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

    if (uid === user.uid) {
      history.push(`/profile`);
    } else {
      dispatch(getUserProfile(uid));
      history.push(`/user/${uid}`);
    }
  }
  function handleBlur() {
    setTimeout(() => {
      setShowSearch(false);
    }, 200);
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
              onChange={(e) => handleChangeInput(e)}
              onBlur={() => handleBlur()}
              onFocus={() => setShowSearch(true)}
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
            onClick={() => setNavActive(false)}
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
          <Hamburger size={30} toggled={navActive} toggle={setNavActive} />
        </button>
      </nav>
      <ul className={styles.renderSearched}>
        {showSearch && inputSearch.length > 1
          ? searchToRender.map((user) => (
              <li key={user.id}>
                <button onClick={(e) => handleSelectUser(e, user.id)}>
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
  );
};

export default NavBar;
