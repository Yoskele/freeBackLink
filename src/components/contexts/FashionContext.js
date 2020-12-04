import React, { createContext, useEffect, useState } from "react";
import firebase from "../../Firebase";

import "firebase/storage";

export const FashionContext = createContext();

const FashionContextProvider = (props) => {
  const [fashionArticles, setFashionArticles] = useState([]);

  const dataBase = firebase.firestore().collection("fashion");

  function getArticles() {
    dataBase.onSnapshot((snap) => {
      const list = [];
      snap.forEach((doc) => {
        list.push(doc.data());
      });
      setFashionArticles(list);
    });
  }

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <FashionContext.Provider value={{ fashionArticles }}>
      {props.children}
    </FashionContext.Provider>
  );
};

export default FashionContextProvider;
