import React from "react";
import firebase from "firebase/app";
import "firebase/auth";

// TODO: move signin to use-auth hook

const LoginPage = () => {
  const handleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const results = await firebase.auth().signInWithPopup(provider);
    console.log(results);
  };

  return (
    <div className="LoginPage">
      <p>Enter via Google Auth</p>
      <button onClick={handleLogin}>Sign In</button>
    </div>
  );
};

export default LoginPage;
