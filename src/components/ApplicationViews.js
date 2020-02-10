import React from "react";
import { UserProvider } from "./users/UserProvider";
import UserList from "./users/UserList";
import { Route } from "react-router-dom";
import PhotoForm from "./photos/PhotoForm";
import { PhotoProvider } from "./photos/PhotoProvider";

export default props => {
  return (
    <>
      <UserProvider>
        <Route exact path="/family" render={props => <UserList {...props} />} />
      </UserProvider>
      <PhotoProvider>
        <Route
          exact
          path="/photos"
          render={props => <PhotoForm {...props} />}
        />
      </PhotoProvider>
    </>
  );
};
