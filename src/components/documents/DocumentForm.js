import React, { useContext, useState } from "react";
import FileUploader from "react-firebase-file-uploader";
import * as firebase from "firebase/app";
import "firebase/storage";
import { DocContext } from "./DocumentProvider";

export default props => {
  const {addDoc} = useContext(DocContext);
  const [URL, setURL] = useState("");

  const DocUploader = filename => {
    firebase
      .storage()
      .ref("Documents")
      .child(filename)
      .getDownloadURL()
        .then(firebaseUrl => {
          setURL(firebaseUrl)
          addDoc({
            userId: parseInt(localStorage.getItem("eyr_user")),
            docURL: firebaseUrl,
            docName: filename
          }).then(props.history.push("/Documents"))
        })
      
  };

  return (
    <>
      <div>
        <form>
          <label><img src={URL} /></label>
          <FileUploader
            accept="pdf/*"
            name="doc"
            filename={file => file.name.split(".")[0]}
            storageRef={firebase.storage().ref("Documents")}
            onUploadSuccess={DocUploader}
          />
        </form>
      </div>
    </>
  );
};