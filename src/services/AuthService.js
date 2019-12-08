import firebase from "../firebase";
import moment from "moment";

export const login = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const loginWithGoogle = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  firebase.auth().languageCode = "pl";
  provider.setCustomParameters({
    login_hint: "user@example.com"
  });
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      const user = result.user;
      const database = firebase.database()
      
      // it's needed because there is profile picture for user and there is no posibility to use push
      database.ref(`/users/${user.uid}/name`).set(user.displayName)
      database.ref(`/users/${user.uid}/email`).set(user.email)
      database.ref(`/users/${user.uid}/joined`).set(moment(user.metadata.creationTime).format("L"))
    })
};

export const register = (email, password, name, bio, joined) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(value => {
      const user = firebase.auth().currentUser;
      user
        .updateProfile({
          displayName: name
        })
        .then(() => {
          firebase
            .database()
            .ref(`/users/${user.uid}`)
            .set({
              name,
              email,
              bio,
              joined
            });
        });
    });
};

export const passwordReset = email => {
  return firebase.auth().sendPasswordResetEmail(email);
};
