import React, { useState, useEffect } from "react";

export const NoteDocContext = React.createContext();

export const NoteDocProvider = props => {
  const [noteDocs, setNoteDocs] = useState([]);

  const getNoteDocs = () => {
    return fetch("http://localhost:8088/noteDocs?_expand=user")
      .then(res => res.json())
      .then(setNoteDocs);
  };

  const addNoteDoc = noteDoc => {
    return fetch("http://localhost:8088/noteDocs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(noteDoc)
    }).then(getNoteDocs);
  };

  const deleteNoteDoc = noteDoc => {
    return fetch(`http://localhost:8088/noteDocs/${noteDoc.id}`, {
      method: "DELETE"
    }).then(getNoteDocs);
  };

  const updateNoteDoc = noteDoc => {
    return fetch(`http://localhost:8088/noteDocs/${noteDoc.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(noteDoc)
    }).then(getNoteDocs);
  };

  useEffect(() => {
    getNoteDocs();
    console.log(noteDocs, "right after get");
  }, []);

  useEffect(() => {
  }, [noteDocs]);

  return (
    <NoteDocContext.Provider
      value={{
        noteDocs,
        addNoteDoc,
        deleteNoteDoc,
        updateNoteDoc
      }}
    >
      {props.children}
    </NoteDocContext.Provider>
  );
};
