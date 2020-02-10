import React, { useContext } from "react"
import "./User.css"
import User from "./User"
import { UserContext } from "./UserProvider"

export default (props) => {
    const { users } = useContext(UserContext)

    return (
        <>
            <h1>Family</h1>

            <div className="family">
                {
                    users.map(user => {
                        return <User key={user.id} user={user} />
                    })
                }
            </div>
        </>
    )
}