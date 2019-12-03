import firebase from "../firebase";

export const login = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)

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
          console.log("Registered user with email, password and name");
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

// .then(function() {
//   // Password reset email sent.
// })
// .catch(function(error) {
//   // Error occurred. Inspect error.code.
// });
