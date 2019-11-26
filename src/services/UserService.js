import firebase from "firebase";

const prepareUsers = data => Object.values(data);

export const watchUsers = onSuccess => {
  return firebase
    .database()
    .ref("/users")
    .on("value", dataSnapshot => {
      const users = dataSnapshot.val();
      onSuccess(prepareUsers(users));
    });
};

export const stopUsers = () => {
  firebase
    .database()
    .ref("/users")
    .off();
};