import React, { useState, useEffect } from "react";

/*
    The context is imported and used by individual components
    that need data
*/
export const DocContext = React.createContext();

/*
 This component establishes what data can be used.
 */
export const DocumentProvider = props => {
  const [docs, setDocs] = useState([]);

  const getDocs = () => {
    return fetch("http://localhost:8088/docs")
      .then(res => res.json())
      .then(setDocs);
  };
  const addDoc = doc => {
    return fetch("http://localhost:8088/docs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(doc)
    }).then(getDocs);
  };

  const deleteDoc = doc => {
    return fetch(`http://localhost:8088/docs/${doc.id}`, {
      method: "DELETE"
    }).then(getDocs);
  };

  /*
        Load all Docs when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
  useEffect(() => {
    getDocs();
  }, []);


  return (
    <DocContext.Provider
      value={{
        docs,
        addDoc,
        deleteDoc
      }}
    >
      {props.children}
    </DocContext.Provider>
  );
};