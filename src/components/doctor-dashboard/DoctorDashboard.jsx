import React, { useState } from "react";
import SetTimeSlots from "./SetTimeSlots";
import BookedAppointments from "./BookedAppointments";
import UpdateProfile from "./UpdateProfile";
import "../../styles/DoctorDashboard.css";

const DoctorDashboard = () => {
    const [activeTab, setActiveTab] = useState("slots");

    return (
        <div className="doctor-dashboard">
            <h2>Doctor Dashboard</h2>
            <nav className="doctor-nav">
                <button onClick={() => setActiveTab("slots")}>Set Time Slots</button>
                <button onClick={() => setActiveTab("appointments")}>Manage Appointments</button>
                <button onClick={() => setActiveTab("profile")}>Update Profile</button>
            </nav>

            <div className="doctor-content">
                {activeTab === "slots" && <SetTimeSlots />}
                {activeTab === "appointments" && <BookedAppointments />}
                {activeTab === "profile" && <UpdateProfile />}
            </div>
        </div>
    );
};

export default DoctorDashboard;
