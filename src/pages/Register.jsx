import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Register.css"; // Import the CSS file

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("https://health-backend-3zzb.onrender.com/api/auth/register", formData);
      console.log("Register Response:", res.data);

      // Show popup
      alert("Registration successful! Please login again.");

      // Redirect to login page
      navigate("/login");

    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}

        {/* Role Selection */}
        <div className="role-card">
          <div
            className={`role-option ${formData.role === "doctor" ? "selected" : ""}`}
            onClick={() => handleRoleSelect("doctor")}
          >
            <p>Doctor</p>
          </div>
          <div
            className={`role-option ${formData.role === "patient" ? "selected" : ""}`}
            onClick={() => handleRoleSelect("patient")}
          >
            <p>Patient</p>
          </div>
        </div>

        {/* Name Input */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="input"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="input"
        />

        <button type="submit" className="button" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Link to login page */}
        <div className="login-link">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Register;
