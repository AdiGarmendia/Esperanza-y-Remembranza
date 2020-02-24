import React, { useContext } from "react";
import { NotePhotoContext } from "./NotePhotoProvider";
import { PhotoContext } from "../photos/PhotoProvider";
import "./NotePhoto.css";


export default ({ notePhoto, history, match}) => {
  console.log(history, "history")
  const { photos } = useContext(PhotoContext);
  const { deleteNotePhoto } = useContext(NotePhotoContext);
  const chosenPhotoId = parseInt(match.params.photoid, 10);
  const photo = photos.find(a => a.id === chosenPhotoId) || {};
  const isActiveUser =
    notePhoto.userId === parseInt(localStorage.getItem("eyr_user"), 10);

  function userNoteButton() {
    if (isActiveUser === true) {
      return (
        <>
          <button
            onClick={() => {
              deleteNotePhoto(notePhoto).then(() => {
               history.push(`/Photos/${photo.id}`);
              });
            }}
          >
            Delete Note
          </button>
          <button
            onClick={() => {
              history.push(`/Photos/NoteEdit/${notePhoto.id}`);
            }}
          >
            edit Note
          </button>
        </>
      );
    }
  }

  return (
    <section className="photo__Note">
      <div className="note__user">Posted by: {notePhoto.user.userName}</div>
      <div className="note__notePhoto">{notePhoto.noteText}</div>
      <div>{userNoteButton()}</div>
    </section>
  );
};
