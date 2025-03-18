// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const ViewAppointments = () => {
//     const [appointments, setAppointments] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const userId = localStorage.getItem("userId"); // Get logged-in user ID

//     useEffect(() => {
//         const fetchAppointments = async () => {
//             if (!userId) return;

//             try {
//                 const response = await axios.get(`http://localhost:5000/api/appointments/${userId}`);
//                 setAppointments(response.data);
//             } catch (err) {
//                 setError("Failed to fetch appointments. Please try again.");
//                 console.error("Error fetching appointments:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchAppointments();
//     }, [userId]); // Fetch again if userId changes

//     // Function to cancel appointment
//     const cancelAppointment = async (appointmentId) => {
//         try {
//             await axios.delete(`http://localhost:5000/api/appointments/${appointmentId}`);

//             // Remove the canceled appointment from state without reloading the page
//             setAppointments((prevAppointments) => 
//                 prevAppointments.filter((appointment) => appointment._id !== appointmentId)
//             );

//             alert("Appointment canceled successfully!");
//         } catch (err) {
//             console.error("Failed to cancel appointment:", err);
//             setError("Failed to cancel appointment. Please try again.");
//         }
//     };

//     return (
//         <div>
//             <h2>My Appointments</h2>

//             {loading ? <p>Loading appointments...</p> : null}
//             {error && <p style={{ color: "red" }}>{error}</p>}

//             {appointments.length === 0 && !loading ? (
//                 <p>No appointments found.</p>
//             ) : (
//                 <ul>
//                     {appointments.map((appointment) => (
//                         <li key={appointment._id}>
//                             <strong>Doctor:</strong> {appointment.doctorId?.name || "N/A"} <br />
//                             <strong>Specialization:</strong> {appointment.doctorId?.specialization || "N/A"} <br />
//                             <strong>Date:</strong> {appointment.date} <br />
//                             <strong>Time:</strong> {appointment.time} <br />
//                             <button onClick={() => cancelAppointment(appointment._id)}>Cancel</button>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default ViewAppointments;

import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [userId, setUserId] = useState(localStorage.getItem("userId")); // Track logged-in user

    // Function to fetch appointments
    const fetchAppointments = async () => {
        const currentUserId = localStorage.getItem("userId"); // Get latest userId
        setUserId(currentUserId); // Update state
        
        if (!currentUserId) {
            setAppointments([]); // Clear appointments if no user
            return;
        }

        try {
            setLoading(true);
            const response = await axios.get(`https://health-backend-3zzb.onrender.com/api/appointments/${currentUserId}`);
            setAppointments(response.data);
        } catch (err) {
            setError("Failed to fetch appointments.");
            setAppointments([]); // Ensure old data is removed
        } finally {
            setLoading(false);
        }
    };

    // Fetch appointments when userId changes
    useEffect(() => {
        fetchAppointments();
    }, [userId]); // ✅ Re-fetch when `userId` updates

    // Listen for `localStorage` changes (detects login/logout)
    useEffect(() => {
        const handleStorageChange = () => {
            setUserId(localStorage.getItem("userId")); // Force state update
            fetchAppointments(); // Fetch latest data
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    // Cancel appointment function
    const cancelAppointment = async (appointmentId) => {
        try {
            await axios.delete(`https://health-backend-3zzb.onrender.com/api/appointments/${appointmentId}`);
            setAppointments((prev) => prev.filter((appt) => appt._id !== appointmentId));
            alert("Appointment canceled successfully!");
        } catch (err) {
            setError("Failed to cancel appointment.");
        }
    };

    return (
        <div>
            <h2>My Appointments</h2>

            {loading && <p>Loading appointments...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && appointments.length === 0 ? (
                <p>No appointments found.</p>
            ) : (
                <ul>
                    {appointments.map((appointment) => (
                        <li key={appointment._id}>
                            <strong>Doctor:</strong> {appointment.doctorId?.name || "N/A"} <br />
                            <strong>Specialization:</strong> {appointment.doctorId?.specialization || "N/A"} <br />
                            <strong>Date:</strong> {appointment.date} <br />
                            <strong>Time:</strong> {appointment.time} <br />
                            <button onClick={() => cancelAppointment(appointment._id)}>Cancel</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ViewAppointments;
