import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css"; // Import the CSS file

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "", role: "patient" });
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
        // Clear previous user data
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");

        const res = await axios.post("https://health-backend-3zzb.onrender.com/api/auth/login", formData);
        console.log("Login Response:", res.data);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("userId", res.data.userId);

        alert("Login successful!");

        // Redirect based on role
        if (res.data.role === "admin") navigate("/admin-dashboard");
        else if (res.data.role === "doctor") navigate("/doctor-dashboard");
        else if (res.data.role === "patient") navigate("/patient-dashboard");
        else setError("Invalid role received from server!");

    } catch (error) {
        setError(error.response?.data?.message || "Invalid credentials");
    } finally {
        setLoading(false);
    }
};


  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}

        {/* Role Selection (moved above email input) */}
        <div className="role-card">
          <div
            className={`role-option ${formData.role === "admin" ? "selected" : ""}`}
            onClick={() => handleRoleSelect("admin")}
          >
            <p>Admin</p>
          </div>
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
          {loading ? "Logging in..." : "Login"}
        </button>
        
        {/* Link to register page */}
        <div className="register-link">
          <p>New user? <Link to="/register">Register here</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
