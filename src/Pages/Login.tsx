import React, { useState } from "react";

export default function Login() {
  const [showModal, setShowModal] = useState(false);

  // close modal if clicked outside content
  const handleOutsideClick = (e) => {
    if (e.target.id === "id01") {
      setShowModal(false);
    }
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)} style={{ width: "auto" }}>
        Login
      </button>

      {showModal && (
        <div id="id01" className="modal" onClick={handleOutsideClick}>
          <form
            className="modal-content animate"
            action="/action_page.php"
            method="post"
          >
            <div className="imgcontainer">
              <span
                onClick={() => setShowModal(false)}
                className="close"
                title="Close Modal"
              >
                &times;
              </span>
              <img src="img_avatar2.png" alt="Avatar" className="avatar" />
            </div>

            <div className="container">
              <label htmlFor="uname">
                <b>Username</b>
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                name="uname"
                required
              />

              <label htmlFor="psw">
                <b>Password</b>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="psw"
                required
              />

              <button type="submit">Login</button>
              <label>
                <input type="checkbox" defaultChecked name="remember" />{" "}
                Remember me
              </label>
            </div>

            <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="cancelbtn"
              >
                Cancel
              </button>
              <span className="psw">
                Forgot <a href="#">password?</a>
              </span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
