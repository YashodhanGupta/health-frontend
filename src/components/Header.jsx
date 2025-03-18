import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Get user role from localStorage
    const userRole = localStorage.getItem("role"); // Ensure this is stored at login

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("role"); // Remove role on logout
        navigate("/login");
    };

    const handleHomeClick = () => {
        if (location.pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            navigate("/");
        }
    };

    const handleAboutClick = () => {
        if (location.pathname !== "/") {
            navigate("/", { replace: true });
            setTimeout(() => {
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        } else {
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleContactClick = () => {
        if (location.pathname !== "/") {
            navigate("/", { replace: true });
            setTimeout(() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        } else {
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <header className="header">
            <div className="logo">
                <h4>TailCare Pets Hospital</h4>
            </div>
            <nav className="nav-links">
                {/* Show these links ONLY if the user is NOT an admin */}
                {userRole !== "admin" && (
                    <>
                        <a href="#home" onClick={handleHomeClick}>Home</a>
                        <a href="#about" onClick={handleAboutClick}>About</a>
                        <Link to="/patient-dashboard" className="book-appointment-link">Book an Appointment</Link>
                        <a href="#contact" onClick={handleContactClick}>Contact</a>
                    </>
                )}

                {/* Always show Logout button when logged in */}
                <div className="auth-placeholder">
                    {localStorage.getItem("token") ? (
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    ) : (
                        <Link to="/login" className="login-link">Login</Link>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
