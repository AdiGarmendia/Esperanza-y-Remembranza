import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export default (props) => {
    return (
        <>
        <section className="navbar__Main">
        <h1 className="navbar__header">Esperanza y Remembranza</h1>
        <ul className="navbar">
                <Link className="navbar__link" to="/">Family</Link>
                <Link className="navbar__link" to="/Photos">Photos</Link>
                <Link className="navbar__link" to="/Documents">Documents</Link>
            
                {
            localStorage.getItem("eyr_user")
            ? 
            <Link className="navbar__link"
                to=""
                onClick={e => {
                    e.preventDefault()
                    localStorage.removeItem("eyr_user")
                    props.history.push("/")
                }}
                >Log Out</Link>
            
                : ""
            }
        </ul>
        </section>
        </>
    )
}