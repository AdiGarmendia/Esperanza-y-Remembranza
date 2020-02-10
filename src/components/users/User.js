import React from "react"
import "./User.css"

export default ({ user }) => (
  <section className="family__Member">
  <h3 className="family__name">{ user.userName }</h3>
  <div className="family__email">{ user.userEmail }</div>
  <div className="family__number">{ user.userNumber }</div>
  <div className="family__Address">{ user.userAddress }</div>
  <div className="family__State">{ user.userState }</div>
  <div className="family__Zip">{ user.userZip }</div>
</section>
)