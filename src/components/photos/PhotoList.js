import React, { useContext } from "react"
import "./Photo.css"
import Photo from "./Photo"
import { PhotoContext } from "./PhotoProvider"

export default (props) => {
    const {photos} = useContext(PhotoContext)

    return (
        <>
            <h1>Photos</h1>
            <button className="btn-photoCreate" onClick={() => {
                    props.history.push("/Photos/Upload")
                }}>Add Photos</button>

            <div className="photos">
                {
                    photos.map(photo => {
                        return <Photo key={photo.id} photo={photo} {...props} />
                    })
                }
            </div>
        </>
    )
}