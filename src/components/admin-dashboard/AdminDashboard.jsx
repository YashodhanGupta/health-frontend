import React, { useState, useEffect } from "react";
import "../../styles/AdminDashboard.css";

const AdminDashboard = () => {
    const [doctors, setDoctors] = useState([]);
    const [users, setUsers] = useState([]);
    const [appointments, setAppointments] = useState([]);

    // Fetch Doctors, Users, and Appointments
    useEffect(() => {
        fetchDoctors();
        fetchUsers();
        fetchAppointments();
    }, []);

    const fetchDoctors = async () => {
        try {
            const res = await fetch("https://health-backend-3zzb.onrender.com/api/admin/doctors");
            const data = await res.json();
            setDoctors(data);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await fetch("https://health-backend-3zzb.onrender.com/api/admin/users");
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchAppointments = async () => {
        try {
            const res = await fetch("https://health-backend-3zzb.onrender.com/api/admin/appointments");
            const data = await res.json();
            setAppointments(data);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };

    // Approve/Reject Doctor
    const updateDoctorStatus = async (id, status) => {
        try {
            await fetch(`https://health-backend-3zzb.onrender.com/api/admin/doctors/${id}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            fetchDoctors(); // Refresh list after update
        } catch (error) {
            console.error("Error updating doctor status:", error);
        }
    };

    // Delete User
    const deleteUser = async (id) => {
        try {
            await fetch(`https://health-backend-3zzb.onrender.com/api/admin/users/${id}`, {
                method: "DELETE",
            });
            fetchUsers(); // Refresh list after delete
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>

            {/* Manage Doctor Registrations */}
            <h3>Doctor Registrations</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctor) => (
                        <tr key={doctor._id}>
                            <td>{doctor.name}</td>
                            <td>{doctor.email}</td>
                            <td>{doctor.status}</td>
                            <td>
                                {doctor.status === "pending" && (
                                    <>
                                        <button onClick={() => updateDoctorStatus(doctor._id, "approved")}>
                                            Approve
                                        </button>
                                        <button onClick={() => updateDoctorStatus(doctor._id, "rejected")}>
                                            Reject
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Manage Users */}
            <h3>Users</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button id="delete-button" onClick={() => deleteUser(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* View Appointments */}
            <h3>Appointments</h3>
            <table>
                <thead>
                    <tr>
                        <th>Doctor</th>
                        <th>Patient</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Age</th>
                        <th>Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
    {appointments.map((appointment) => (
        <tr key={appointment._id}>
            <td>{appointment.doctorId?.name || "Not Assigned"}</td> {/* Doctor Name */}
            <td>{appointment.name}</td>
            <td>{appointment.email}</td>
            <td>{appointment.contact}</td>
            <td>{appointment.age}</td>
            <td>{appointment.time}</td>
            <td>{appointment.status || "Pending"}</td>
        </tr>
    ))}
</tbody>

            </table>
        </div>
    );
};

export default AdminDashboard;
