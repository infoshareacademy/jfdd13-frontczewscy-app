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

export const watchUser = async () => {
  const userId = firebase.auth().currentUser.uid;
  // return firebase
  //   .database()
  //   .ref(`/users/${userId}`)
  //   .once("val")
  //   .val();

  const dataSnapshot = await firebase
    .database()
    .ref(`/users/${userId}`)
    .once("value");

  const user = dataSnapshot.val();
  return user;
};

export const stopUsers = () => {
  firebase
    .database()
    .ref("/users")
    .off();
};

export const handleFavoritesFirebase = async (partyId, userId) => {
  const partiesRef = await firebase.database().ref(`/favorites/${userId}`);
  const dataSnapshot = await partiesRef.once("value");

  const parties = dataSnapshot.val() || {};

  if (typeof parties === "string") {
    const newParties = ["initial value", partyId];
    return partiesRef.set(newParties);
  }

  const alreadyExists = parties[partyId];

  if (alreadyExists) {
    const newParties = { ...parties, [partyId]: null };
    return partiesRef.set(newParties);
  } else {
    const newParties = { ...parties, [partyId]: true };
    return partiesRef.set(newParties);
  }
};

export const getUserFavorites = async () => {
  const userId = firebase.auth().currentUser.uid;

  // return firebase
  //   .database()
  //   .ref(`/favourites/${userId}`)
  //   .on("value", dataSnapshot => {
  //     const users = dataSnapshot.val();
  //     return users;
  //   });

  const favoritesRef = await firebase.database().ref(`/favorites/${userId}`);
  const dataSnapshot = await favoritesRef.once("value");

  const favorites = dataSnapshot.val();

  return favorites;
};
