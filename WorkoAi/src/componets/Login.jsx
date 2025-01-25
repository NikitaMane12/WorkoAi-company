import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Retrieve user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // Check if stored user exists and validate credentials
    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      // Mock token after successful login
      const mockToken = "sample_token_12345"; // Mock token
      localStorage.setItem("token", mockToken);
      navigate("/home"); // Redirect to home page after successful login
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="login-form" onSubmit={handleLogin}>
        <div className="input-group">
          <label className="input-label">Email:</label>
          <input
            className="input-field"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label className="input-label">Password:</label>
          <input
            className="input-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
        <button className="submit-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
