import './App.css';
import Register from './Components/Register/Register';
import loading from './sass/loading.gif'
import { useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import MyPerfil from './Components/MyPerfil/MyPerfil'
import LoginPage from './Components/LoginPage/LoginPage'
import { Route, Routes } from 'react-router-dom';


function App() {
  const [log, setLog] = useState(0)
  const auth = getAuth();


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
      return <MyPerfil />
    } else if (log === 2) {
      return <LoginPage />
    }
  }


  return (
    <div className="App">



      {/* <Route path='/'> */}
      {/* <Register /> */}
      {/* {log !== 0 ? render() : <img className='loading' src={loading} alt='' />} */}
      {/* </Route> */}


      <Register />



    </div>
  );
}

export default App;
