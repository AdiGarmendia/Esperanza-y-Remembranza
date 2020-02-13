import React from "react";
import { UserProvider } from "./users/UserProvider";
import UserList from "./users/UserList";
import { Route } from "react-router-dom";
import PhotoForm from "./photos/PhotoForm";
import { PhotoProvider } from "./photos/PhotoProvider";
import DocumentForm from "./documents/DocumentForm";
import { DocumentProvider } from "./documents/DocumentProvider";
import PhotoList from "./photos/PhotoList";
import NotePhotoForm from "./notesPhotos/NotePhotoForm";
import { NotePhotoProvider } from "./notesPhotos/NotePhotoProvider";
import PhotoDetails from "./photos/PhotoDetails";
import { NoteDocProvider } from "./notesDocuments/NoteDocumentProvider";
import NoteDocumentForm from "./notesDocuments/NoteDocumentForm";
import DocumentDetails from "./documents/DocumentDetails";
import DocumentList from "./documents/DocumentList";

export default props => {
  return (
    <>
      <UserProvider>
        <Route exact path="/" render={props => <UserList {...props} />} />
      </UserProvider>

      <PhotoProvider>
        <UserProvider>
          <NotePhotoProvider>
            <Route
              exact
              path="/Photos"
              render={props => <PhotoList {...props} />}
            />

            <Route
              exact
              path="/Photos/Upload"
              render={props => <PhotoForm {...props} />}
            />

            <Route
              exact
              path="/Photos/Notes/:photoid(\d+)"
              render={props => <NotePhotoForm {...props} />}
            />
            <Route
              exact
              path="/Photos/NoteEdit/:notePhotoId(\d+)"
              render={props => <NotePhotoForm {...props} />}
            />

            <Route
              path="/Photos/:photoid(\d+)"
              render={props => <PhotoDetails {...props} />}
            />
          </NotePhotoProvider>
        </UserProvider>
      </PhotoProvider>

      <DocumentProvider>
        <UserProvider>
          <NoteDocProvider>
            <Route
              exact
              path="/Documents"
              render={props => <DocumentList {...props} />}
            />

            <Route
              exact
              path="/Documents/Upload"
              render={props => <DocumentForm {...props} />}
            />

            <Route
              exact
              path="/Documents/DocNote/:docid(\d+)"
              render={props => <NoteDocumentForm {...props} />}
            />
            <Route
              exact
              path="/Documents/NoteDocEdit/:noteDocId(\d+)"
              render={props => <NoteDocumentForm {...props} />}
            />

            <Route
              path="/Documents/:docid(\d+)"
              render={props => <DocumentDetails {...props} />}
            />
          </NoteDocProvider>
        </UserProvider>
      </DocumentProvider>
    </>
  );
};
