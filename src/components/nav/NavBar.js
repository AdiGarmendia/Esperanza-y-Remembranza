import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export default (props) => {
    return (
        <>
        <h1 className="navbar__header">Esperanza y Remembranza</h1>
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="navbar__link" to="/Family">Family</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/Photos">Photos</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/Documents">Documents</Link>
            </li>
            
                {
            localStorage.getItem("eyr_user")
            ? <li className="navbar__item">
            <Link className="navbar__link"
                to=""
                onClick={e => {
                    e.preventDefault()
                    localStorage.removeItem("eyr_user")
                    props.history.push("/")
                }}
                >Log Out</Link>
            </li>
                : ""
            }
        </ul>
        </>
    )
}