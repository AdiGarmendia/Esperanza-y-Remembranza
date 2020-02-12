import React, { useContext } from "react";
import "./Photo.css";
import { PhotoContext } from "./PhotoProvider";
import { NotePhotoContext } from "../notesPhotos/NotePhotoProvider";
import NotePhoto from "../notesPhotos/NotePhoto";

export default props => {
  const { photos, history } = useContext(PhotoContext);
  const { notePhotos } = useContext(NotePhotoContext);

  const chosenPhotoId = parseInt(props.match.params.photoid, 10);
  const photo = photos.find(a => a.id === chosenPhotoId) || {};
  const isActiveUser = photo.userId === parseInt(localStorage.getItem("eyr_user"), 10);
  console.log(isActiveUser);
  const foundPhotoNotes = notePhotos.filter(notePhoto => {
    return notePhoto.photoid === chosenPhotoId
})


  return (
    <section className="photo--photo">
      <div className={isActiveUser ? "act_user" : "photo_user"}></div>
      <img className="family__Image" src={photo.photoURL} />
      <button
        className="btn--photoNote"
        onClick={() => {
          props.history.push(`/Photos/Notes/${photo.id}`);
        }}
      >
        Add Notes
      </button>
      <div className="notePhotos">
                {
                    foundPhotoNotes.map(notePhoto => {
                        return <NotePhoto {...props} key={notePhoto.id} notePhoto={notePhoto} />
                    })
                }
            </div>
    </section>
  );
};
