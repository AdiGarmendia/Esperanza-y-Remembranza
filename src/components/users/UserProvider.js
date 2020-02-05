import React, { useState, useEffect } from "react"

export const UserContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const UserProvider = (props) => {
    const [users, setUsers] = useState([])

    const getUsers = () => {
        return fetch("http://localhost:8088/users")
            .then(res => res.json())
            .then(setUsers)
    }

    const addUser = user => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then((createdUser)=>{
            localStorage.setItem("eyr_user", createdUser.id);
        })
            .then(getUsers)
    }





    /*
        Load all users when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
    useEffect(() => {
        getUsers()
    }, [])

    useEffect(
        () => {
            console.log("****  User APPLICATION STATE CHANGED  ****")
            console.log(users)
        },
        [getUsers])

   
    return (
        <UserContext.Provider value={{
            // Want to add ability edit user info later           
            users, addUser 
        }}>
            {props.children}
        </UserContext.Provider>
    )
}