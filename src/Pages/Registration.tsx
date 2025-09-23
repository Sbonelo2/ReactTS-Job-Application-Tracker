import React, { useState } from "react";

export default function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    
    const newUser = { name, email, password };

  
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("Registration successful!");
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Full Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "4px" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "4px" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "4px" }}
            />
          </label>
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 15px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}
