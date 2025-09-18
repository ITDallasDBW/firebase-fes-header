import React from 'react';
import './App.css';
import logo from './assets/logo.png'
import { auth } from "./firebase/init"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false)
      console.log(user);
      if(user) {
        setUser(user)
      }
    })
  }, []);

  function register() {
    console.log('register');
    createUserWithEmailAndPassword(auth, "email@eail.com", "test123")
    .then((user) => {
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  function login() {
    signInWithEmailAndPassword(auth, "email@eail.com", "test123")
    .then(({user}) => {
      console.log(user.email[0]);
      setUser(user);
    })
    .catch((error) => {
      console.log(error.message);
    });
  }

  function logout() {
    console.log("logout");
    signOut(auth);
    setUser({});
  }




  return (

    <div className="App">
      <div className="dashboard__nav">
        <div className="dashboard__nav--content">
          <div className="flex align-center">
            <figure className="logo">
              <a href="/">
                <img src={logo} className="logo__img" />
              </a>
            </figure>
          </div>
          <div className="nav__links">
            <span className="nav__link--home" onClick={login}>Login</span>
            <button className="btn btn--primary nav__btn" onClick={register}>Register</button>
            <button className=" nav__icon" onClick={logout}>{user.email[0]}</button>
          </div>

        </div>
      </div>
      
    </div>
  );
}

export default App;
