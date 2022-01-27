import './App.css';
import Register from './components/Register/Register';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import loading from './sass/loading.gif';
import { useEffect, useState } from 'react';
import { Switch, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import MyPerfil from './components/MyPerfil/MyPerfil';
import LoginPage from './components/LoginPage/LoginPage';
import RecoverPassword from './components/RecoverPassword/RecoverPassword';
import UserProfile from './components/UserProfile/UserProfile';
import Error404 from './components/Error404/Error404';
import { useDispatch } from 'react-redux';
import { getMyProfile } from './Redux/02-actions';
import axios from 'axios';
import CardLink from './components/CardLink/CardLink';






function App() {
  const [log, setLog] = useState(0)
  const auth = getAuth();
  const dispatch = useDispatch();





  







  useEffect(() => {
    setInterval(() => {
      dispatch(getMyProfile(auth.currentUser.uid))
      console.log("llamo ahora")
    }, 60000)
  }, [])





  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
      setLog(1)


    } else {
      // User is signed out
      // ...
      setLog(2)

    }
  });





  function render() {
    if (log === 1) {
      return <Switch>
        <Route exact path='/'>
          <NavBar />
          <Home />
        </Route>
        <Route path='/profile'>
          <NavBar />
          <MyPerfil />
        </Route>
        <Route exact path="/user/:id">
          <NavBar />
          <UserProfile />
        </Route>

        <Route exact path="/post/:id">
          {/* <NavBar /> */}
          <CardLink />
        </Route>





        <Route path="*">
          <Error404 />
        </Route>



      </Switch>

    } else if (log === 2) {
      return <Switch >
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route path="/recovery">
          <RecoverPassword />
        </Route>
        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    }
  }


  return (
    <div className="App">



      {log !== 0 ? render() : <div className="LoadingPage">

        <img className='loadingApp' src={loading} alt='' />
      </div>}







    </div>
  );
}

export default App;
