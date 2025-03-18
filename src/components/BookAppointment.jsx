import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // ✅ Import SweetAlert2 for popup
import "../styles/BookAppointment.css";

const BookAppointment = () => {
    const { doctorId, time } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",
        age: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://health-backend-3zzb.onrender.com/api/appointments", {
                doctorId,
                time,
                ...formData,
            });

            // ✅ Show success popup using SweetAlert2
            Swal.fire({
                title: "Appointment Booked!",
                text: `Your appointment with the doctor at ${time} has been confirmed.`,
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                navigate("/patient-dashboard"); // ✅ Redirect to dashboard after clicking OK
            });

        } catch (error) {
            Swal.fire({
                title: "Booking Failed!",
                text: "Failed to book the appointment. Please try again.",
                icon: "error",
            });
        }
    };

    return (
        <div className="appointment-container">
            <h2>Book Appointment</h2>
            <p><strong>Selected Time:</strong> {time}</p>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                <label>Contact:</label>
                <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />

                <label>Age:</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} required />

                <button type="submit" className="confirm-btn">Confirm Appointment</button>
            </form>
        </div>
    );
};

export default BookAppointment;
