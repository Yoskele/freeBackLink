import React, { useState, useEffect, useRef } from "react";
import firebase from "../../Firebase";
import ArticlePage from "../pages/ArticlePage";
const Top5LatestArticles = () => {
  const [topList, setTopList] = useState([]);
  const top5List = topList.slice(1, 3);

  const getUserArticles = () => {
    // Loop through all the collections and see if user has any articles.
    let categoryList = ["fashion", "cars", "travel", "No Category"];
    categoryList.forEach((category) => {
      firebase
        .firestore()
        .collection(category)
        .onSnapshot((querySnapshot) => {
          const newList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          // We take the newList and insert it into userArticles so we can display.
          setTopList((topList) => topList.concat(newList));
        });
    });
  };
  useEffect(() => {
    getUserArticles();
  }, []);

  const list = top5List.length ? (
    <div>
      <ul className="">
        {top5List.map((article, index) => {
          return (
            <li
              key={index}
              className="m-3  mx-auto listArticle"
              style={{
                minWidth: "200px",
                backgroundColor: "white",
                fontSize: "1.5rem",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              onClick={() => ArticlePage(article)}
            >
              {article.title}
            </li>
          );
        })}
      </ul>{" "}
    </div>
  ) : (
    <div>...</div>
  );

  return list;
};

export default Top5LatestArticles;
