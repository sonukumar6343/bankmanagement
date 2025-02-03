import React, { useState } from "react";
import "./Form.css"; // Import CSS file
import axios from "axios";
import { useNavigate } from "react-router";
import { backendDomain } from "../config";

const SignupForm = () => {
  const navigate=useNavigate("");
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success,setSuccess] =useState("");
  const [loading, setLoading] = useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!username || !email || !password ) {
      setError("All fields are required!");
      return;
    }
    setLoading(true); // Disable button while request is in progress
   try {
    const response = await axios.post(`${backendDomain}/api/auth/register`,{
      username,
      email,
      password

    });
    navigate("/login");
    // console.log("response is:",response);
    console.log("signup successful:",response.data);
    setSuccess("user registerd successful");
    setError("");
    setusername("");
    setEmail("");
    setPassword("");

    
   } catch (error) {
    console.error("Signup error:",error.response?.data?.message || error.message);
    setError(error.response?.data?.message||"signup failed");
   }

    

    console.log("Signup successful:", { username, email, password });
    setError(""); // Clear errors
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
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
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default SignupForm;
