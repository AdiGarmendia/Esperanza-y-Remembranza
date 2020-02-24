import React, { useRef } from "react";
import "./Register.css";

const Register = props => {
  const userName = useRef();
  const email = useRef();
  const password = useRef();
  const verifyPassword = useRef();
  const userNumber = useRef();
  const userAddress = useRef();
  const userState = useRef();
  const userZip = useRef();

  const existingUserCheck = () => {
    return fetch(`http://localhost:8088/users?userEmail=${email.current.value}`)
      .then(_ => _.json())
      .then(user => {
        if (user.length) {
          return true;
        }
        return false;
      });
  };

  const handleRegister = e => {
    e.preventDefault();

    if (password.current.value === verifyPassword.current.value) {
      existingUserCheck().then(() => {
        fetch("http://localhost:8088/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userEmail: email.current.value,
            userPassword: password.current.value,
            userName: userName.current.value,
            userNumber: parseInt(userNumber.current.value, 10),
            userAddress: userAddress.current.value,
            userState: userState.current.value,
            userZip: parseInt(userZip.current.value, 10)
          })
        })
          .then(_ => _.json())
          .then(createdUser => {
            if (createdUser.hasOwnProperty("id")) {
              localStorage.setItem("eyr_user", createdUser.id);
              props.history.push("/");
            }
          });
      });
    } else {
      window.alert("Passwords do not match");
    }
  };

  return (
    <main className="container--register">
      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">
          Please Register for Esperanza y Remembranza
        </h1>
        <fieldset>
          <label htmlFor="userName"> Username </label>
          <input
            ref={userName}
            type="text"
            name="userName"
            className="form-control"
            placeholder="Username"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="inputEmail"> Email address </label>
          <input
            ref={email}
            type="email"
            name="email"
            className="form-control"
            placeholder="Email address"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="userNumber"> Phone Number </label>
          <input
            ref={userNumber}
            type="number"
            name="userNumber"
            className="form-control"
            placeholder="Phone Number"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="userAddress"> Street Address </label>
          <input
            ref={userAddress}
            type="text"
            name="userAddress"
            className="form-control"
            placeholder="Street Address"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="userState"> State </label>
          <input
            ref={userState}
            type="text"
            name="userState"
            className="form-control"
            placeholder="State"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="userZip"> Zip Code </label>
          <input
            ref={userZip}
            type="number"
            name="userZip"
            className="form-control"
            placeholder="Zip Code"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="inputPassword"> Password </label>
          <input
            ref={password}
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="verifyPassword"> Verify Password </label>
          <input
            ref={verifyPassword}
            type="password"
            name="verifyPassword"
            className="form-control"
            placeholder="Verify password"
            required
          />
        </fieldset>
        <fieldset>
          <button type="submit">Sign in</button>
        </fieldset>
      </form>
    </main>
  );
};

export default Register;