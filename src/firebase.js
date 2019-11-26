import firebase from "firebase";

var firebaseConfig = {
  apiKey: "XD",
  authDomain: "frontczewscy-database.firebaseapp.com",
  databaseURL: "https://frontczewscy-database.firebaseio.com",
  projectId: "frontczewscy-database",
  storageBucket: "frontczewscy-database.appspot.com",
  messagingSenderId: "XD",
  appId: "XD",
  measurementId: "XD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
