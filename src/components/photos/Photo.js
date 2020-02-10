import React from "react"
import "./Photo.css"

export default ({ photo }) => (
  <section className="family__Photo">
    <div>
    <img className="family__Image" src={photo.photoUrl} /></div>
</section>
)