import React, { useContext, useState, useEffect } from "react";
import { DocContext } from "../documents/DocumentProvider";
import { NoteDocContext } from "./NoteDocumentProvider";

export default (props, history) => {
  const { docs } = useContext(DocContext);
  const { noteDocs, updateNoteDoc, addNoteDoc } = useContext(
    NoteDocContext
  );
  const chosenDocId = parseInt(props.match.params.docid, 10);
  const doc = docs.find(a => a.id === chosenDocId) || {};

  const [noteDoc, setNoteDoc] = useState({});

  const editMode = props.match.params.hasOwnProperty("noteDocId");

  const handleControlledInputChange = event => {
    const newNoteDoc = Object.assign({}, noteDoc);
    newNoteDoc[event.target.name] = event.target.value;
    setNoteDoc(newNoteDoc);
  };

  const setDefaults = () => {
    if (editMode) {
      const noteDocId = parseInt(props.match.params.noteDocId);
      const selectedNoteDoc =
        noteDocs.find(m => m.id === noteDocId) || {};
      setNoteDoc(selectedNoteDoc);
    }
  };

  useEffect(() => {
    setDefaults();
  }, [noteDocs]);

  const noteDocId = parseInt(props.match.params.noteDocId);
  const selectedNoteDoc = noteDocs.find(m => m.id === noteDocId) || {};

  const createNewNoteDoc = () => {
    if (editMode) {
      updateNoteDoc({
        id: noteDoc.id,
        userId: parseInt(localStorage.getItem("eyr_user")),
        noteDocText: noteDoc.noteDocText,
        docid: selectedNoteDoc.id,
        timestamp: Date.now()
      }).then(props.history.push(`/Documents/${noteDocId}`))
    } else {
      addNoteDoc({
        userId: parseInt(localStorage.getItem("eyr_user")),
        noteDocText: noteDoc.noteDocText,
        docid: chosenDocId,
        timestamp: Date.now()
      }).then(props.history.push(`/Documents/${doc.id}`))
    }
  };

  return (
    <form className="noteDocForm">
      <h2 className="noteDocForm__title">
        {editMode ? "Edit noteDoc" : "Add noteDoc"}
      </h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="noteDocText">Notes: </label>
          <textarea
            name="noteDocText"
            required
            className="form-control"
            proptype="varchar"
            placeholder=""
            defaultValue={noteDoc.noteDocText}
            onChange={handleControlledInputChange}
          ></textarea>
        </div>
      </fieldset>

      <button
        type="submit"
        onClick={evt => {
          evt.preventDefault();
          createNewNoteDoc();
          
        }}
        className="btn btn-primary"
      >
        {editMode ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
};