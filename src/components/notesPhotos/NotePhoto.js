import React, { useContext } from "react"
import { NotePhotoContext } from "./NotePhotoProvider";


export default ({ notePhoto }) => {
const { deleteNotePhoto, updateNotePhoto } = useContext(NotePhotoContext)
const isActiveUser =
notePhoto.userId === parseInt(localStorage.getItem("eyr_user"), 10);
console.log(isActiveUser);


function userNoteButton() {
if (isActiveUser === true) {
  return (
  <>
    <button
      onClick={() => {
        deleteNotePhoto(notePhoto);
      }}
    >
      Delete Note
    </button>
    <button
      onClick={() => {
        // props.history.push(`/Photos/Notes/${notePhoto.id}`);
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
  <div className="note__user">Posted by: { notePhoto.user.userName }</div>
  <div className="note__notePhoto">{ notePhoto.noteText }</div>
  <div>{userNoteButton()}</div>
</section>
)
}