import React, { useContext } from "react";
import "./Document.css";
import { DocContext } from "./DocumentProvider";
import { NoteDocContext } from "../notesDocuments/NoteDocumentProvider";
import NoteDocument from "../notesDocuments/NoteDocument";

export default props => {
  const { docs } = useContext(DocContext);
  const { noteDocs } = useContext(NoteDocContext);

  const chosenDocId = parseInt(props.match.params.docid, 10);
  const doc = docs.find(a => a.id === chosenDocId) || {};
  const isActiveUser = doc.userId === parseInt(localStorage.getItem("eyr_user"), 10);
  const foundDocNotes = noteDocs.filter(noteDoc => {
    return noteDoc.docid === chosenDocId
})


  return (
    <section className="Doc--Doc">
      <div className={isActiveUser ? "act_user" : "doc_user"}></div>
      <div className="family__pdfIcon"></div>
      <a href={doc.docURL} target="_blank">Link to Document</a>
      {/* <img className="family__Image" src={doc.docURL} /> */}
      <button
        className="btn--docNote"
        onClick={() => {
          props.history.push(`/Documents/DocNote/${doc.id}`);
        }}
      >
        Add Notes
      </button>
      <div className="noteDocs">
                {
                    foundDocNotes.map(noteDoc => {
                        return <NoteDocument {...props} key={noteDoc.id} noteDoc={noteDoc} />
                    })
                }
            </div>
    </section>
  );
};