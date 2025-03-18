import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateProfile = () => {
    const doctorId = localStorage.getItem("userId"); // Assuming doctor ID is stored in localStorage
    const [doctor, setDoctor] = useState({
        name: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                console.log(`Fetching doctor details for ID: ${doctorId}`);
                const response = await axios.get(`https://health-backend-3zzb.onrender.com/api/doctors/${doctorId}`);
                console.log("Doctor Data:", response.data); // ✅ Debugging: Log API response
                setDoctor(response.data);
            } catch (error) {
                console.error("Error fetching doctor data:", error);
            }
        };

        if (doctorId) {
            fetchDoctor();
        }
    }, [doctorId]);

    const handleChange = (e) => {
        setDoctor({ ...doctor, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://health-backend-3zzb.onrender.com/api/doctors/${doctorId}`, doctor);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div>
            <h3>Update Profile</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={doctor.name} onChange={handleChange} placeholder="Name" required />
                <input type="email" name="email" value={doctor.email} onChange={handleChange} placeholder="Email" required />
                <input type="password" name="password" value={doctor.password} onChange={handleChange} placeholder="New Password" />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};
export default UpdateProfile;
