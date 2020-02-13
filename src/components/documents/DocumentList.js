import React, { useContext } from "react"
import "./Document.css"
import Document from "./Document"
import { DocContext } from "./DocumentProvider"

export default (props) => {
    const {docs} = useContext(DocContext)

    return (
        <>
            <h1>Documents</h1>
            <button className="btn-DocCreate" onClick={() => {
                    props.history.push("/Documents/Upload")
                }}>Add Docs</button>

            <div className="Docs">
                {
                    docs.map(doc => {
                        return <Document key={doc.id} doc={doc} {...props} />
                    })
                }
            </div>
        </>
    )
}