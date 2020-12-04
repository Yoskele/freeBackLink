import React, { createContext, useState, useEffect, useContext } from "react";
import firebase from "../../Firebase";
import "firebase/storage";

import { AuthContext } from "./AuthContext";

export const ArticleContext = createContext();

const ArticleContextProvider = (props) => {
  const { user } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [uploadArticle, setUploadArticle] = useState(false);
  const [editContainer, setEditContainer] = useState(false);

  const [article, setArticle] = useState("");

  const [userArticles, setUserArticles] = useState([]);

  console.log("userArticles ", userArticles);

  const getUserArticles = () => {
    console.log("getUserArticles");
    // Loop through all the collections and see if user has any articles.
    let categoryList = ["fashion", "cars", "travel", "No Category"];
    categoryList.forEach((category) => {
      firebase
        .firestore()
        .collection(category)
        .where("post_by", "==", `${user.email}`)
        .onSnapshot((querySnapshot) => {
          const newList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          // We take the newList and insert it into userArticles so we can display.
          setUserArticles((userArticles) => userArticles.concat(newList));
          // setUserArticles(newList);
        });
    });
  };

  // Create Article
  const createArticle = (newArticle) => {
    console.log("Createing Article in Context File... ", newArticle);
    if (userArticles.length < 3) {
      newArticle.create_at = new Date();
      try {
        // call firebase
        firebase
          .firestore()
          // .collection(user.email)
          .collection(newArticle.category)
          //.doc(`${newArticle.id}`)
          .doc(`${user.email}-${userArticles.length}`)
          .set(newArticle, { merge: true })
          .then(() => {
            console.log("Saved Article to firebase.");
            setUploadArticle(!uploadArticle);
            //window.location.reload();
          })
          .catch((err) => {
            console.log("firebase Catch error ", err);
          });
      } catch (err) {
        setErrorMessage(err);
        console.log("Try & catch error ", err);
      }
    } else {
      let message = (
        <div>
          {" "}
          <p>You have to many articles, please delete one. </p>
          <p> Max limit 3 articles per user.</p>
        </div>
      );
      setErrorMessage(message);
    }
  };

  const uploadArticleImage = async (image) => {
    console.log("uploading image ", image);
    const imageStorage = firebase.storage().ref();
    const storage = imageStorage.child(`${user.email}/${image.name}`);
    // Save image.
    const saveImage = await storage.put(image);
    const imageUrl = await storage.getDownloadURL();
    const path = saveImage.ref.location.path;
    let url = imageUrl;
    let linkPath = path;
    let imageObject = {};
    imageObject.name = url;
    imageObject.path = linkPath;
    return imageObject;
  };

  const deleteArticle = (article) => {
    console.log("delete article ", article);
    if (article.image) {
      deleteImage(article);
    }
    firebase.firestore().collection(article.category).doc(article.id).delete();
    // We deleted the article after that we need to filter it out from the DOM.
    const newList = userArticles.filter((item) => item.id !== article.id);
    setUserArticles(newList);
  };

  const deleteImage = (article) => {
    const imageStorage = firebase.storage().ref();
    let imageRef = imageStorage.child(article.linkPath);
    imageRef.delete();
    console.log("Image is deleted...");
  };

  const getOneArticle = (id, category) => {
    try {
      firebase
        .firestore()
        .collection(category)
        .doc(id)
        .get()
        .then((doc) => {
          setArticle(doc.data());
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("article ", article);
    } catch (err) {
      console.log(err);
    }
  };
  const EditArticle = (id, category) => {
    setEditContainer(true);
    // get the article and set the state.
    getOneArticle(id, category);
  };

  const saveChangesOnArticle = (saveArticle) => {
    console.log("updateArticle Co", saveArticle);

    try {
      firebase
        .firestore()
        .collection(saveArticle.category)
        .doc(saveArticle.id)
        .set(saveArticle, { merge: true });
    } catch (err) {
      console.log(err);
    }
    setEditContainer(!editContainer);
    getUserArticles();
    console.log("we are done!");
  };

  return (
    <ArticleContext.Provider
      value={{
        createArticle,
        deleteArticle,
        errorMessage,
        uploadArticle,
        setUploadArticle,
        uploadArticleImage,
        editContainer,
        setEditContainer,
        EditArticle,
        saveChangesOnArticle,
        article,
        userArticles,
        getUserArticles,
      }}
    >
      {props.children}
    </ArticleContext.Provider>
  );
};

export default ArticleContextProvider;

// const getUserArticles = () => {
//   console.log("getUserArticles");
//   // Loop through all the collections and see if user has any articles.
//   let categoryList = ["fashion", "cars", "travel", "No Category"];
//   categoryList.forEach((category) => {
//     firebase
//       .firestore()
//       .collection(category)
//       .where("post_by", "==", `${user.email}`)
//       .onSnapshot((querySnapshot) => {
//         const newList = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         // We take the newList and insert it into userArticles so we can display.
//         setUserArticles((userArticles) => userArticles.concat(newList));
//         // setUserArticles(newList);
//       });
//   });
// };
