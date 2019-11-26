import firebase from "../firebase";

const prepareParties = data => {
  return Object.entries(data).map(arr => {
    const [id, value] = arr;
    return {
      id,
      ...value
    };
  });
};

export const watchParties = onSuccess => {
  return firebase
    .database()
    .ref("/parties")
    .on("value", dataSnapshot => {
      const messages = dataSnapshot.val();
      onSuccess(prepareParties(messages));
    });
};

export const stopParties = () => {
  firebase
    .database()
    .ref("/messages")
    .off();
};
