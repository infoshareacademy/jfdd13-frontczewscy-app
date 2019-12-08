import React, { Component } from "react";
import { Progress } from 'semantic-ui-react'
import firebase, { storage } from "../firebase";
import styles from "./ImageUpload.module.css";
import { watchUser } from "../services/UserService";

class ImageUpload extends Component {  
    state = {
      user: {},
      image: null,
      url: "",
      progress: 0,
      buttons: true,
      uploading: false
    }

  componentDidMount() {
    this.checkIfUserHasProfilePicture();
    watchUser().then(user => {
        this.setState({ user })
    });
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState({ image, uploading: true }, () => {
        this.handleUpload();
        this.setState({ image: null });
      });
    }
  }
  
  handleUpload = () => {
    const { image } = this.state;
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          // progress function
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ progress });
        },
        error => {
          // error function
          console.log(error);
        },
        () => {
          // complete function
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              this.setState({ url });
              this.updateProfilePicture(url);
              this.setState({ buttons: false });
            });
        }
      );
    }
  };
  updateProfilePicture = url => {
    // 1. check what user are you logged in
    const currentUser = firebase.auth().currentUser;
    const id = currentUser.uid;
    // 2. get the url and update user profile
    firebase
      .database()
      .ref(`/users/${id}/profilePicture`)
      .set(url);
      this.setState({
        uploading: false
      })
  };
  checkIfUserHasProfilePicture = async () => {
    // 1. get current user id
    const currentUser = firebase.auth().currentUser;
    const id = currentUser.uid;
    // 2. fetch current user profile picture
    const dataSnapshot = await firebase
      .database()
      .ref(`/users/${id}/profilePicture`)
      .once("value");
    const profilePictureUrl = dataSnapshot.val();
    // 3. if there is a picture, use it
    if (profilePictureUrl) {
      // 4. update state of the component
      this.setState({
        url: profilePictureUrl
      });
    }
  };

  render() {
    const { user } = this.state;
    return (
      <>
        {user && (
          <div className={styles.userDetails}>
            <img
              height="250px"
              style={{ margin: "20px 0 0 0" }}
              src={
                this.state.url ||
                "https://react.semantic-ui.com/images/avatar/large/matthew.png"
              }
              alt="Zdjęcie profilowe"
            />
            {this.state.uploading && <Progress  style={{ width: "50%" }} percent={this.state.progress} indicating />}
            <label htmlFor="file" className={styles.inputFileLabel}>
              Kliknij aby zaktualizować zdjęcie
            </label>
            <div className={styles.uploadButtons}>
              <input
                className={styles.inputFileHidden}
                type="file"
                onChange={this.handleChange}
                accept="image/*"
                style={{ width: "100%" }}
                name="file"
                id="file"
              />
            </div>
            <h1
              style={{ margin: 0 }}
            >
              {user.name}
            </h1>
            <p>{user.bio}</p>
            <p>Data dołączenia {user.joined}</p>
            <p>Adres email {user.email}</p>
          </div>
        )}
      </>
    );
  }
}
export default ImageUpload;
