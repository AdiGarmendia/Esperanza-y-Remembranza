import React, { useContext, useState } from "react";
import FileUploader from "react-firebase-file-uploader";
import * as firebase from "firebase/app";
import "firebase/storage";
import { PhotoContext } from "./PhotoProvider";

export default props => {
  const {addPhoto} = useContext(PhotoContext);
  const [URL, setURL] = useState("");

  const photoUploader = filename => {
    console.log("filename", filename);
    firebase
      .storage()
      .ref("Photos")
      .child(filename)
      .getDownloadURL()
        .then(firebaseUrl => {
          setURL(firebaseUrl)
          addPhoto({
            userId: parseInt(localStorage.getItem("eyr_user")),
            photoURL: firebaseUrl
          })
        })
      
  };

  return (
    <>
      <div>
        <form>
          <label><img src={URL} /></label>
          <FileUploader
            accept="image/*"
            name="photo"
            filename={file => file.name.split(".")[0]}
            storageRef={firebase.storage().ref("Photos")}
            onUploadSuccess={photoUploader}
          />
        </form>
      </div>
    </>
  );
};