import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const DoctorProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    axios.get(`https://health-backend-3zzb.onrender.com/api/doctors/${id}`)
      .then((res) => setDoctor(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const bookAppointment = () => {
    if (userRole !== "patient") {
      alert("Only patients can book appointments!");
      return;
    }

    axios.post("https://health-backend-3zzb.onrender.com/api/appointments", { doctorId: id })
      .then(() => {
        alert("Appointment booked successfully!");
        navigate("/appointments");
      })
      .catch((err) => console.error(err));
  };

  if (!doctor) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>{doctor.name}</h2>
        <p>Specialization: {doctor.specialization}</p>
        <p>Availability: {doctor.availability}</p>
        {userRole === "patient" && <button onClick={bookAppointment}>Book Appointment</button>}
      </div>
    </div>
  );
};

export default DoctorProfile;
