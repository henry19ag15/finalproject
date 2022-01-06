import logo from './logo.svg';
import './App.css';
import LoginPage from './Components/LoginPage/LoginPage';
import Register from './Components/Register/Register';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import MyPerfil from './Components/MyPerfil/MyPerfil';
import { useEffect, useState } from 'react';

function App() {
  const [log, setLog] = useState(false)
  const auth = getAuth();


  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
      setLog(true)
    } else {
      // User is signed out
      // ...
      setLog(false)

    }
  });




  return (
    <div className="App">
      <Register />
      {log ? <MyPerfil /> : <LoginPage />}
    </div>
  );
}

export default App;
