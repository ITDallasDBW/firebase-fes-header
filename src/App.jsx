import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./assets/logo.png";
import { auth } from "./firebase/init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  // `user` is null when no user is signed in. 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loggedOut, setLoggedOut] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user || "no user yet");
      // setUser(user || null);
    });
  }, []);

  function register() {
    console.log("register");
    createUserWithEmailAndPassword(auth, "email@email.com", "test123")
      .then((user) => {
        // console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login() {
    setLoggedOut(false);
    setLoading(true);
    signInWithEmailAndPassword(auth, "email@email.com", "test123")
      .then(({ user }) => {
        // console.log(user.email[0]);
        // console.log("logged in");
        setTimeout(() => {
          setLoading(false);
          setUser(user);
        }, 2000);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function logout() {
    console.log("logout");
    // signOut returns a promise; clear local user state after success.
    setLoggedOut(true);
    signOut(auth)
      .then(() => setUser(null))
      .catch((err) => console.log(err));
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
            {loading && (
              <button className="load__btn load__btn--wide">Loading</button>
            )}

            {user ? (
              <button className="nav__icon" onClick={logout}>
                {user.email[0]}
              </button>
            ) : (
              <>
                {loggedOut && (
                  <div className="homepage">
                    <span className="nav__link--home" onClick={login}>
                      Login
                    </span>
                    <button
                      className="btn btn--primary nav__btn"
                      onClick={register}
                    >
                      Register
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  );
}

export default App;
