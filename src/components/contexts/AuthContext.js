import React, { createContext, useEffect, useState } from "react";
import firebase from "../../Firebase";
import "firebase/auth";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [user, setUser] = useState("");
  const [userState, setUserState] = useState(false);
  // const [userArticles, setUserArticles] = useState([]);

  const getUser = async () => {
    //return user from firebase
    try {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // If we have a user.
          console.log("Got User ", user.email);
          setUser(user);
          setUserState(true);
        } else {
          // If we dont have a user.
          console.log("No User Redicect", user);
          setUserState(false);
        }
      });
    } catch (err) {
      console.log("catch error");
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  const loginUser = async (email, password) => {
    console.log("login...");
    try {
      let userFromFirebase = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          //   console.log("user ", user);
          setUser({ user });
          setUserState(true);
          getUser();
          return true;
        })
        .catch((err) => {
          // setErrorMessage(err.message);
        });
      return userFromFirebase;
    } catch (err) {
      console.log(err);
    }
  };

  const logOutUser = () => {
    try {
      firebase
        .auth()
        .signOut()
        .then((res) => {
          setUserState(!userState);
          window.location.href = "/";
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   const getUserArticles = () => {
  //     console.log("getUserArticles");
  //     // Loop through all the collections and see if user has any articles.
  //     let categoryList = ["fashion", "cars", "travel", "No Category"];
  //     categoryList.forEach((category) => {
  //       firebase
  //         .firestore()
  //         .collection(category)
  //         .where("post_by", "==", `${user.email}`)
  //         .onSnapshot((querySnapshot) => {
  //           // merging in the articles to array.
  //           querySnapshot.forEach((doc) => {
  //             setUserArticles((userArticles) => [...userArticles, doc.data()]);
  //           });
  //         });
  //     });
  //   };
  //   getUserArticles();
  // }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        userState,
        loginUser,
        logOutUser,
        getUser,
        setUserState,
        // userArticles,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

// useEffect(() => {
//   const userArticles = () => {
//     firebase
//       .firestore()
//       .collection("fashion")
//       .where("user", "==", `${user.email}`)
//       .get()
//       .then((snapshot) => {
//         const newArticles = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setUserArticleArray(newArticles);
//       })
//       .catch(function (error) {
//         console.log("Error getting documents: ", error);
//       });
//   };
//   userArticles();
// }, [user]);
