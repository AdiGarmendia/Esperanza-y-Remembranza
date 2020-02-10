import React from "react"
import { Route, Redirect } from "react-router-dom"
import NavBar from "./nav/NavBar"
import Login from "./auth/Login"
import Register from "./auth/Register"
import ApplicationViews from "./ApplicationViews"
import "./EsperanzaYRemembranza.css"


//   const firebase = require("firebase");
// // Required for side-effects
// require("firebase/firestore");
  // Your web app's Firebase configuration
  
  // Initialize Firebase
  
  


export default () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("eyr_user")) {
                return (
                    <>
                        <Route render={props => <NavBar {...props} />} />
                        <Route render={props => <ApplicationViews {...props} />} />
                    </>
                )
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/register" render={props => <Register {...props} />} />
    </>
)