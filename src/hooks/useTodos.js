import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

export const useTodos = (user) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (user) {
      const db = firebase.firestore();
      const unsubscribe = db
        .collection("todos")
        .where("uid", "==", user.uid)
        .orderBy("createdAt")
        .onSnapshot((snapshot) => {
          setTodos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });

      return unsubscribe;
    }
  }, [user]);

  const addTodo = (value) => {
    const db = firebase.firestore();
    db.collection("todos").add({
      description: value,
      isComplete: false,
      uid: user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const deleteTodo = (id) => {
    const db = firebase.firestore();
    db.collection("todos").doc(id).delete();
  };

  return {
    todos,
    addTodo,
    deleteTodo,
  };
};
