import React, { useState, useEffect } from "react";

export const NotePhotoContext = React.createContext();

export const NotePhotoProvider = props => {
  const [notePhotos, setNotePhotos] = useState([]);

  const getNotePhotos = () => {
    return fetch("http://localhost:8088/notePhotos?_expand=user")
      .then(res => res.json())
      .then(setNotePhotos);
  };

  const addNotePhoto = notePhoto => {
    return fetch("http://localhost:8088/notePhotos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(notePhoto)
    }).then(getNotePhotos);
  };

  const deleteNotePhoto = notePhoto => {
    return fetch(`http://localhost:8088/notePhotos/${notePhoto.id}`, {
      method: "DELETE"
    }).then(getNotePhotos);
  };

  const updateNotePhoto = notePhoto => {
    return fetch(`http://localhost:8088/notePhotos/${notePhoto.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(notePhoto)
    }).then(getNotePhotos);
  };

  useEffect(() => {
    getNotePhotos();
    console.log(notePhotos, "right after get");
  }, []);

  useEffect(() => {
    console.log("notephotos in provider", notePhotos);
  }, [notePhotos]);

  return (
    <NotePhotoContext.Provider
      value={{
        notePhotos,
        addNotePhoto,
        deleteNotePhoto,
        updateNotePhoto
      }}
    >
      {props.children}
    </NotePhotoContext.Provider>
  );
};
