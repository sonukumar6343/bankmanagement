import React, { useState } from "react";
import "./Form.css"; // Import CSS file
import axios from "axios";
import { useNavigate } from "react-router";
import { backendDomain } from "../config";

const LoginForm = () => {
  const navigate= useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required!");
      return;
    }
    setLoading(true);
    const login = await axios.post(`${backendDomain}/api/auth/login`, {
      email,
      password
   }, {
     withCredentials: true // Add this line to include cookies in the request
   });
   
setLoading(false);
console.log("login role",login.data.role);
if(login.data.role ==="admin"){
  navigate("/admin");
}else{
    navigate("/bankManagement")}
    console.log("Login successful:", { email, password });
    setError(""); // Clear errors
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
         <button type="submit" disabled={loading}>
          {loading ? "logging in..." : "log in"}
        </button>
      </form>
      <p>Don't have an account? <a href="/signup">Sign Up</a></p>
    </div>
  );
};

export default LoginForm;
