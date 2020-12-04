import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCBWGSHrGsjnf0ccwtXTCKm1racyPv3u28",
  authDomain: "freebacklink-c56ae.firebaseapp.com",
  databaseURL: "https://freebacklink-c56ae.firebaseio.com",
  projectId: "freebacklink-c56ae",
  storageBucket: "freebacklink-c56ae.appspot.com",
  messagingSenderId: "433826682890",
  appId: "1:433826682890:web:594ce5f113cabe8c77a7f3",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
