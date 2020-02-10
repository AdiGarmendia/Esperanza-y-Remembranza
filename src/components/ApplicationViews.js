import React from "react";
import { UserProvider } from "./users/UserProvider";
import UserList from "./users/UserList";
import { Route } from "react-router-dom";
import PhotoForm from "./photos/PhotoForm";
import { PhotoProvider } from "./photos/PhotoProvider";
import DocumentForm from "./documents/DocumentForm";
import { DocumentProvider } from "./documents/DocumentProvider"
import PhotoList from "./photos/PhotoList";

export default props => {
  return (
    <>
      <UserProvider>
        <Route exact path="/family" render={props => <UserList {...props} />} />
      </UserProvider>

      <PhotoProvider>
        <Route
          exact
          path="/Photos"
          render={props => <PhotoList {...props} />}
          // exact
          // path="/Photos/Upload"
          // render={props => <PhotoForm {...props} />}
        />
      </PhotoProvider>

      <DocumentProvider>
        <Route
        exact
        path="/Documents"
        render={props => <DocumentForm {...props} />}
        />
      </DocumentProvider>
    </>
  );
};
