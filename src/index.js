import React from "react";
import ReactDOM from "react-dom";
import App from "components/App";
import firebase from "firebase/app";

firebase.initializeApp({
  apiKey: "AIzaSyA8Slwa42sGtvwTDzJ1qBStPc-YE7bNHHk",
  authDomain: "mytodo-d9d21.firebaseapp.com",
  databaseURL: "https://mytodo-d9d21.firebaseio.com",
  projectId: "mytodo-d9d21",
  storageBucket: "mytodo-d9d21.appspot.com",
  messagingSenderId: "752649031750",
  appId: "1:752649031750:web:37eecd377541a09adefa47",
  measurementId: "G-CQVLEWTLX0",
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
