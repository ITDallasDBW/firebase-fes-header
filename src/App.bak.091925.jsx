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
  // `user` is null when no user is signed in. This makes conditional rendering
  // simple: show the button only when `user` is a valid object.
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // setLoading(false);
      console.log(user || "no user yet");
      // `user` will be `null` when signed out, so store it directly.
      setUser(user || null);
    });
  }, []);

  function register() {
    console.log("register");
    createUserWithEmailAndPassword(auth, "email@email.com", "test123")
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login() {
    // setLoading(true);
    setShowSkeleton(true);
    signInWithEmailAndPassword(auth, "email@email.com", "test123")
      .then(({ user }) => {
        console.log(user.email[0]);
        console.log("logged in");
        // setTimeout(() => {
        //   console.log("2 seconds")
        //   setShowSkeleton(false);
        setUser(user);

        // }, 2000);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function logout() {
    console.log("logout");
    // signOut returns a promise; clear local user state after success.
    signOut(auth)
      .then(() => setUser(null))
      .catch((err) => console.log(err));
  }

  function loggedIn() {
    return (
      <button className="nav__icon" onClick={logout}>
        {user.email && user.email[0]}
      </button>
    );
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
            {user ? (
              <button className="nav__icon" onClick={logout}>
                {user.email && user.email[0]}
              </button>
            ) : (
              <>
                {loading && (
                  <div className="home__btns">
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

                {showSkeleton && (
                  <div className="load__skeleton">
                    <div className="home__btns">
                      <button className="load__btn load__btn--wide">
                        Logging in...
                      </button>
                      <button className="load__btn load__btn--circle">C</button>
                    </div>
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
