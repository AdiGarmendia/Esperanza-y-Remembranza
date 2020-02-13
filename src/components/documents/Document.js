import React, { useContext } from "react";
import "./Document.css";
import { Link } from "react-router-dom";
import { DocContext } from "./DocumentProvider";
// import PDFViewer from "pdf-viewer-reactjs"

export default ({ doc, history }) => {
  const isActiveUser =
    doc.userId === parseInt(localStorage.getItem("eyr_user"), 10);

    let deleteDocButton = ""

    if (isActiveUser === true) {
      deleteDocButton = <>
          <button onClick={
              () => {
                  deleteDoc(doc)
                      
              }
          }>Delete</button>
      </>
    }
    

  const { deleteDoc } = useContext(DocContext);
  return (
    <section className="family__doc">
      <div className={isActiveUser ? "act_user" : "doc_user"}></div>
      <div>
      <Link to={`/Documents/${doc.id}`}>
      <div className="family__pdfIcon"></div>
      </Link>
       {deleteDocButton}
      </div>
    </section>
  );
};

{/* <PDFViewer
            document={{
                url: `${doc.docURL}`,
                mode: 'cors', // no-cors, *cors, same-origin
            }}/> */}