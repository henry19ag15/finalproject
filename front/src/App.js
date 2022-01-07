import './App.css';
import Register from './components/Register/Register.js';

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
      return <MyPerfil  />
    } else if (log === 2) {
      return <LoginPage />
    }
  }


  return (
    <div className="App">
      {/* <Register /> */}
      {log !== 0 ? render() : <img className='loading' src={loading} alt=''/>}
    </div>
  );
}

export default App;
