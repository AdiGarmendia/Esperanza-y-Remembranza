import React, { useState, useEffect } from "react";

/*
    The context is imported and used by individual components
    that need data
*/
export const PhotoContext = React.createContext();

/*
 This component establishes what data can be used.
 */
export const PhotoProvider = props => {
  const [photos, setPhotos] = useState([]);

  const getPhotos = () => {
    return fetch("http://localhost:8088/photos")
      .then(res => res.json())
      .then(setPhotos);
  };
  const addPhoto = photo => {
    return fetch("http://localhost:8088/photos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(photo)
    }).then(getPhotos);
  };

  const deletePhoto = photo => {
    return fetch(`http://localhost:8088/photos/${photo.id}`, {
      method: "DELETE"
    }).then(getPhotos);
  };

  /*
        Load all Photos when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
  useEffect(() => {
    getPhotos();
  }, []);

  useEffect(() => {
    console.log("****  Photo APPLICATION STATE CHANGED  ****");
    console.log(photos);
  }, []);

  return (
    <PhotoContext.Provider
      value={{
        photos,
        addPhoto,
        deletePhoto
      }}
    >
      {props.children}
    </PhotoContext.Provider>
  );
};
