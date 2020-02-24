import React, { useContext } from "react";
import { DocContext } from "../documents/DocumentProvider";
import { NoteDocContext } from "./NoteDocumentProvider";
import "./NoteDocument.css";

export default ({ noteDoc, history, match}) => {
  console.log(history, "history")
  const { docs } = useContext(DocContext);
  const { deleteNoteDoc } = useContext(NoteDocContext);
  const chosenDocId = parseInt(match.params.docid, 10);
  const doc = docs.find(a => a.id === chosenDocId) || {};
  const isActiveUser =
    noteDoc.userId === parseInt(localStorage.getItem("eyr_user"), 10);

  function userNoteDocButton() {
    if (isActiveUser === true) {
      return (
        <>
          <button
            onClick={() => {
              deleteNoteDoc(noteDoc).then(() => {
               history.push(`/Documents/${doc.id}`);
              });
            }}
          >
            Delete Note
          </button>
          <button
            onClick={() => {
              history.push(`/Documents/NoteDocEdit/${noteDoc.id}`);
            }}
          >
            edit Note
          </button>
        </>
      );
    }
  }

  return (
    <section className="Doc__Note">
      <div className="note__user">Posted by: {noteDoc.user.userName}</div>
      <div className="note__noteDoc">{noteDoc.noteDocText}</div>
      <div>{userNoteDocButton()}</div>
    </section>
  );
};