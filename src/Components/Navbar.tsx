import React from 'react'
export default function Navbar() {
  return (
      <div className="Navbar"
      
      style={{
        backgroundColor: "black",
        width: "100%",
        padding: "1rem",
       color: "white",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        // flexWrap: "wrap",
      }}>
      <a href="#home">Home</a>
      {/* <a href="#Landing">Landing</a> */}
      <a href="#Jobs">Jobs</a>
      <a href="#Page404">Page404</a>
      <a href="#Registration">Registration</a>
      <a href="#Login">Login</a>
    </div>
  );
}
