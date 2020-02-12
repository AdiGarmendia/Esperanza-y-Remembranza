import React, { useContext } from "react";
import "./Photo.css";
import { PhotoContext } from "./PhotoProvider";
import { Link } from "react-router-dom";


export default ({ photo, history }) => {
  const isActiveUser =
    photo.userId === parseInt(localStorage.getItem("eyr_user"), 10);
    console.log(isActiveUser)

    let deletePhotoButton = ""

    if (isActiveUser === true) {
      deletePhotoButton = <>
          <button onClick={
              () => {
                  deletePhoto(photo)
                      
              }
          }>Delete</button>
      </>
    }

  const { deletePhoto } = useContext(PhotoContext);
  return (
    <section className="family__Photo">
      <div className={isActiveUser ? "act_user" : "photo_user"}></div>
      <div>
      <Link to={`/Photos/${photo.id}`}>
        <img className="family__Image" src={photo.photoURL} /></Link>
       {deletePhotoButton}
      </div>
    </section>
  );
};
