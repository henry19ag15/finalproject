import React, { useState, useEffect } from "react";
import styles from "./NavBar.module.scss";
import { BiSearchAlt, BiMessageRoundedDetail } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { RiVipCrownLine, RiVipCrownFill } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsPatchCheckFill } from "react-icons/bs";

import { getAllUser, getMyProfile } from "../../Redux/02-actions/index";
import logo from "../../assets/logo3.png";
import noimg from "../../sass/noimg.png";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { Sling as Hamburger } from "hamburger-react";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../../Redux/02-actions";
import Post from "../Post/Post";
import Notificaiones from "../Notificaciones/Notificaciones";
import axios from "axios";
import Premium from "../Premium/Premium";
import PremiumCheck from "../Premium/PremiumCheck";

const NavBar = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = auth.currentUser;
  const allUser = useSelector((state) => state.allUser);
  const myProfile = useSelector((state) => state.myProfile);
  const [navActive, setNavActive] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchToRender, setSearchToRender] = useState([]);
  const [notiView, setNotiView] = useState(false);
  // console.log(allUser);
  const [searchResponsActive, setSearchResponsActive] = useState(false);

  ///////////// LLAMADA A MERCADO PAGO /////////////
  const [data, setData] = useState("");

  useEffect(() => {
    // console.log(auth.currentUser.uid);
    axios
      .post("https://pruebaconbackreal-pg15.herokuapp.com/mercadopago", {
        uid: auth.currentUser.uid,
      })
      .then((res) => {
        setData(res.data);
        // console.info("Contenido de data:", res);
      })
      .catch((err) => console.log("se rompio"));
  }, []);

  /* 
  useEffect(() => {
    if (aux !== 0) {
      axios
        .post("https://pruebaconbackreal-pg15.herokuapp.com/mercadopago", {
          uid: auth.currentUser.uid,
        })
        .then((res) => {
          // setData(res.data)
          console.info("Contenido de data:", res);
        })
        .catch((err) => console.log("se rompio"));
    } else {
      console.log("es igual a undefined");
    }
  }, [aux]);
  */

  ///////////////////////////////////////////////////

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  useEffect(() => {
    setSearchToRender(
      allUser.filter((user) =>
        user.username.toLowerCase().includes(inputSearch.toLowerCase())
      )
    );
  }, [inputSearch]);

  function handleGoProfile(e) {
    e.prenventDefault();
    setNavActive(false);
  }
  // let searchToRender = [];
  function handleChangeInput(e) {
    setInputSearch(e.target.value);

    // console.log("esto se renderiza", searchToRender);
  }

  function handleSelectUser(e, uid) {
    // e.preventDefault()

    if (uid === user.uid) {
      history.push(`/profile`);
      setInputSearch("");
    } else {
      dispatch(getUserProfile(uid));
      history.push(`/user/${uid}`);
      setInputSearch("");
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

  ////////// LOGICA DE NOTIFICAIONES //////////
  function validateNotification() {
    const validate = myProfile?.notifications?.filter(
      (noti) => noti.visto === false
    );
    return validate?.length;
  }

  function handleNotificationView() {
    axios
      .put("https://pruebaconbackreal-pg15.herokuapp.com/notification/viewed", {
        id: auth.currentUser.uid,
      })
      .then((res) => {
        dispatch(getMyProfile(auth.currentUser.uid));
        // console.log(res);
      })
      .catch((err) => console.log(err));

    setNotiView(!notiView);
  }

  //////////////////////////////////////////////

  ////////////// LOGICA DE PREMIUM //////////////
  const [premiumModalView, setPremiumModalView] = useState(false);
  const premiumValidate = myProfile && myProfile?.orders?.length>0;

  function handleViewPremium(e) {
    setPremiumModalView(!premiumModalView);
  }

  //////////////////////////////////////////////

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
                value={inputSearch}
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
          <li
            className={
              !showSearch
                ? styles.searchBar
                : `${styles.searchBar} ${styles.focusSearch}`
            }
          >
            <div className={styles.inputIconBox}>
              <input
                className={styles.input}
                type="text"
                value={inputSearch}
                placeholder="Buscar..."
                onChange={(e) => handleChangeInput(e)}
                onBlur={() => handleBlur()}
                onFocus={() => setShowSearch(true)}
              ></input>

              <button className={styles.btn} type="submit">
                <BiSearchAlt />
              </button>
            </div>
            <ul className={styles.renderSearched}>
              {showSearch && inputSearch.length > 0
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
          </li>

          <li>
            <button
              onClick={() => {
                setSearchResponsActive(true);
                setNavActive(false);
              }}
              className={styles.btnOpenSearchInNavResp}
            >
              <BiSearchAlt />
            </button>
          </li>

          {/* //////////////////// PREMIUM //////////////////// */}

          <li>
            <button
              className={
                premiumValidate
                  ? `${styles.btnPremiumView} ${styles.btnPremiumViewCheck}`
                  : styles.btnPremiumView
              }
              onClick={(e) => handleViewPremium(e)}
            >
              <div
                className={premiumValidate ? styles.iconCheck : styles.iconStar}
              >
                {premiumValidate ? <BsPatchCheckFill /> : <AiFillStar />}
              </div>
              {premiumValidate ? <RiVipCrownFill /> : <RiVipCrownLine />}
            </button>

            {premiumModalView ? (
              premiumValidate ? (
                <PremiumCheck setPremiumModalView={setPremiumModalView}/>
              ) : (
                <Premium
                  setPremiumModalView={setPremiumModalView}
                  data={data}
                  premiumValidate={premiumValidate}
                />
              )
            ) : (
              false
            )}
          </li>

          {/* ////////////////////////////////////////////////// */}

          <li className={styles.menuItem}>
            <button
              className={styles.btnNotifi}
              onClick={() => handleNotificationView()}
            >
              {validateNotification() !== 0 ? (
                <p className={styles.numAlert}>{validateNotification()}</p>
              ) : (
                false
              )}
              <IoMdNotificationsOutline />
            </button>
            {notiView ? <Notificaiones /> : false}
          </li>
          <li className={styles.add}>
            <Post />
          </li>

          <li className={styles.liBoxSearchResponsive}>
            <button
              className={styles.btnOpenSearchInNavResp}
              onClick={(e) => handleOpenSearchRespons(e)}
            >
              <BiSearchAlt />
            </button>
          </li>

          <Link
            to="/profile"
            onClick={() => setNavActive(false)}
            className={styles.menuItem}
          >
            {" "}
            {user.photoURL ? (
              <img className="user-img" src={user.photoURL} alt="" />
            ) : (
              <img className="user-img" src={noimg} alt="" />
            )}
          </Link>
        </ul>
        <button
          className={styles.btn_toogle}
          onClick={() => setNotiView(false)}
        >
          <Hamburger size={30} toggled={navActive} toggle={setNavActive} />
        </button>
      </nav>
    </div>
  );
};

export default NavBar;
