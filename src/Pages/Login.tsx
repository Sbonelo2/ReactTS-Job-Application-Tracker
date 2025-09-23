import React, { useState, useEffect } from "react";
import avatarImg from "../assets/LOL.png";

export default function Login() {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  
  const handleOutsideClick = (e) => {
    if (e.target.id === "loginModal") {
      setShowModal(false);
    }
  };

  
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") setShowModal(false);
    };
    if (showModal) {
      window.addEventListener("keydown", onEsc);
    }
    return () => window.removeEventListener("keydown", onEsc);
  }, [showModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log("Logging in:", { username, password });
    
    setShowModal(false);
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        style={{
          width: "auto",
          padding: "0.5rem 1rem",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Login
      </button>

      {showModal && (
        <div
          id="loginModal"
          className="modal"
          onClick={handleOutsideClick}
          style={{ display: "block" }}
          aria-modal="true"
          role="dialog"
        >
          <form
            className="modal-content animate"
            onSubmit={handleSubmit}
            style={{ maxWidth: "400px", margin: "auto" }}
          >
            <div className="imgcontainer">
              <span
                onClick={() => setShowModal(false)}
                className="close"
                title="Close Modal"
                style={{ cursor: "pointer", fontSize: "2rem" }}
              >
                &times;
              </span>
              <img src={avatarImg} alt="Avatar " className="avatar" />
            </div>

            <div className="container">
              <label htmlFor="uname">
                <b>Username</b>
              </label>
              <input
                id="uname"
                type="text"
                placeholder="Enter Username"
                name="uname"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <label htmlFor="psw">
                <b>Password</b>
              </label>
              <input
                id="psw"
                type="password"
                placeholder="Enter Password"
                name="psw"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit">Login</button>
              <label>
                <input type="checkbox" defaultChecked name="remember" />{"😊"}
                Remember me
              </label>
            </div>

            <div
              className="container"
              style={{ backgroundColor: "#f2fafaff", textAlign: "right" }}
            >
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="cancelbtn"
                style={{
                  backgroundColor: "#f44336",
                  color: "#fff",
                  borderStyle: "solid",
                  border: "double",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginTop: "3%"
                }}
              >
                Cancel
              </button>
              <span className="psw" style={{ marginLeft: "1rem" }}>
                Forgot <a href="#">password?</a>
              </span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
