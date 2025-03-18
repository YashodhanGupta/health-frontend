import React from "react";
import "../styles/DoctorCard.css"; // Import separate CSS file

const DoctorCard = ({ doctor, onBookAppointment }) => {
  return (
    <div className="doctor-card">
      <h2>{doctor.name}</h2>
      <p><strong>Specialization:</strong> {doctor.specialization}</p>
      <p><strong>Experience:</strong> {doctor.experience} years</p>
      <button onClick={() => onBookAppointment(doctor)}>Book Appointment</button>
    </div>
  );
};

export default DoctorCard;
