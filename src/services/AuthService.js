import firebase from "../firebase";

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
      // This gives you a Google Access Token. You can use it to access the Google API.
      // var token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      firebase
        .database()
        .ref(`/users/${user.uid}`)
        .push({
          favorites: ["initial value"]
        });

      debugger;
      // ...
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
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
              joined,
              favorites: ["initial value"]
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
