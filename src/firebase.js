import firebase from "firebase/app";
import "firebase/storage";

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

firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();

export default firebase;
