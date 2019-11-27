import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyClsb3yVGx9MrVEfZjNtz_637QN166iqWk",
  authDomain: "frontczewscy-database.firebaseapp.com",
  databaseURL: "https://frontczewscy-database.firebaseio.com",
  projectId: "frontczewscy-database",
  storageBucket: "frontczewscy-database.appspot.com",
  messagingSenderId: "965209740516",
  appId: "1:965209740516:web:7464923ca514d3358388f1",
  measurementId: "G-9SRXWYBECN"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
