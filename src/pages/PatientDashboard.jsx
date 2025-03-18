import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/PatientDashboard.css";

const PatientDashboard = () => {
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [showAppointments, setShowAppointments] = useState(false);

    const userEmail = "yashodhan1273@gmail.com"; // Replace with dynamically logged-in user email
    const navigate = useNavigate();

    // Fetch list of doctors
    // useEffect(() => {
    //     const fetchDoctors = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:5000/api/doctors");
    //             setDoctors(response.data);
    //         } catch (error) {
    //             console.error("Failed to fetch doctors:", error);
    //         }
    //     };
    //     fetchDoctors();
    // }, []);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get("https://health-backend-3zzb.onrender.com/api/doctors");
                setDoctors(response.data);
            } catch (error) {
                console.error("Failed to fetch doctors:", error);
            }
        };
        fetchDoctors();
    }, []);
    

    // Fetch appointments for the logged-in user
    const fetchAppointments = async () => {
        try {
            console.log("Fetching appointments...");
            const response = await axios.get(`https://health-backend-3zzb.onrender.com/api/appointments/${userEmail}`);
            console.log("Response Data:", response.data);

            if (response.data.length === 0) {
                alert("No appointments found!");
            }

            setAppointments(response.data);
            setShowAppointments(true);
        } catch (error) {
            console.error("Error fetching appointments:", error);
            alert("You don't have any appointments.");
        }
    };

    // Cancel an appointment
    const cancelAppointment = async (appointmentId) => {
        try {
            const response = await axios.delete(`https://health-backend-3zzb.onrender.com/api/appointments/${appointmentId}`);
    
            if (response.status === 200) {
                alert("Appointment cancelled successfully!");
    
                // Update UI by filtering out deleted appointment
                setAppointments((prevAppointments) =>
                    prevAppointments.filter((appointment) => appointment._id !== appointmentId)
                );
            }
        } catch (error) {
            console.error("Error canceling appointment:", error);
            alert("Failed to cancel appointment. Please try again.");
        }
    };
    

    return (
        <div className="dashboard-container">
            <div className="button-container">
                <button onClick={() => setShowAppointments(false)}>Browse Doctors</button>
                <button onClick={fetchAppointments}>View Appointments</button>
            </div>
    
            {!showAppointments ? (
                <div className="cards-container">
                    {doctors.length > 0 ? (
                        doctors.map((doctor) => (
                            <div key={doctor._id} className="doctor-card">
                                <h3>{doctor.name}</h3>
                                <p><strong>Specialization:</strong> {doctor.specialization}</p>
                                <p><strong>Experience:</strong> {doctor.experience} years</p>
                                <p><strong>Availability (Mon - Fri):</strong></p>
                                <ul>
                                    {doctor.availability.map((time, index) => (
                                        <li key={index} className="availability-item">
                                            {time}
                                            <button
                                                className="book-btn"
                                                onClick={() => navigate(`/book-appointment/${doctor._id}/${time}`)}
                                            >
                                                Book
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    ) : (
                        <p>Loading doctors...</p>
                    )}
                </div>
            ) : (
                <div className="appointments-container">
                    <h2>Your Appointments</h2>
                    <div className="cards-container">
                        {appointments.length > 0 ? (
                            appointments.map((appointment) => (
                                <div key={appointment._id} className="appointment-card">
                                    <p><strong>Doctor:</strong> {appointment.doctorId?.name || "Unknown"}</p>
                                    <p><strong>Specialization:</strong> {appointment.doctorId?.specialization || "N/A"}</p>
                                    <p><strong>Time:</strong> {appointment.time}</p>
                                    <p><strong>Patient Name:</strong> {appointment.name}</p>
                                    <button className="cancel-btn" onClick={() => cancelAppointment(appointment._id)}>
                                        Cancel
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No appointments booked.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
    
};

export default PatientDashboard;
