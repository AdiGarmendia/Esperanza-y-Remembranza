import React, { useContext, useState, useEffect } from "react";
import "./NotePhoto.css";
import { NotePhotoContext } from "./NotePhotoProvider";
import { PhotoContext } from "../photos/PhotoProvider";

export default (props, history) => {
  const { photos } = useContext(PhotoContext);
  const { notePhotos, updateNotePhoto, addNotePhoto } = useContext(
    NotePhotoContext
  );
  const chosenPhotoId = parseInt(props.match.params.photoid, 10);
  const photo = photos.find(a => a.id === chosenPhotoId) || {};

  const [notePhoto, setNotePhoto] = useState({});

  const editMode = props.match.params.hasOwnProperty("notePhotoId");

  const handleControlledInputChange = event => {
    const newNotePhoto = Object.assign({}, notePhoto);
    newNotePhoto[event.target.name] = event.target.value;
    console.log("targetvalue", notePhoto);
    setNotePhoto(newNotePhoto);
  };

  const setDefaults = () => {
    if (editMode) {
      const notePhotoId = parseInt(props.match.params.notePhotoId);
      const selectedNotePhoto =
        notePhotos.find(m => m.id === notePhotoId) || {};
      setNotePhoto(selectedNotePhoto);
      console.log(selectedNotePhoto);
    }
  };

  useEffect(() => {
    setDefaults();
  }, [notePhotos]);

  const notePhotoId = parseInt(props.match.params.notePhotoId);
  const selectedNotePhoto = notePhotos.find(m => m.id === notePhotoId) || {};

  const createNewNotePhoto = () => {
    if (editMode) {
      updateNotePhoto({
        id: notePhoto.id,
        userId: parseInt(localStorage.getItem("eyr_user")),
        noteText: notePhoto.notePhotoArea,
        photoid: selectedNotePhoto.id,
        timestamp: Date.now()
      }).then(props.history.push(`/Photos/${notePhotoId}`))
    } else {
      addNotePhoto({
        userId: parseInt(localStorage.getItem("eyr_user")),
        noteText: notePhoto.notePhotoArea,
        photoid: chosenPhotoId,
        timestamp: Date.now()
      }).then(props.history.push(`/Photos/${photo.id}`))
    }
  };

  return (
    <form className="notePhotoForm">
      <h2 className="notePhotoForm__title">
        {editMode ? "Edit notePhoto" : "Add notePhoto"}
      </h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="notePhotoArea">Notes: </label>
          <textarea
            name="notePhotoArea"
            required
            className="form-control"
            proptype="varchar"
            placeholder=""
            defaultValue={notePhoto.noteText}
            onChange={handleControlledInputChange}
          ></textarea>
        </div>
      </fieldset>

      <button
        type="submit"
        onClick={evt => {
          evt.preventDefault();
          createNewNotePhoto();
          
        }}
        className="btn btn-primary"
      >
        {editMode ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
};
