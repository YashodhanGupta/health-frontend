import React, { useState, useEffect } from "react";
import "../../styles/AdminDashboard.css";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [appointments, setAppointments] = useState([]);

    // Fetch Users and Appointments
    useEffect(() => {
        fetchUsers();
        fetchAppointments();
    }, []);

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

    // Approve Doctor (Update Status)
    const approveDoctor = async (id) => {
        try {
            await fetch(`https://health-backend-3zzb.onrender.com/api/admin/users/${id}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "approved" }),
            });
            fetchUsers(); // Refresh list after update
        } catch (error) {
            console.error("Error approving doctor:", error);
        }
    };

    // Reject Doctor (Delete User)
    const rejectDoctor = async (id) => {
        try {
            await fetch(`https://health-backend-3zzb.onrender.com/api/admin/users/${id}`, {
                method: "DELETE",
            });
            fetchUsers(); // Refresh list after delete
        } catch (error) {
            console.error("Error deleting doctor:", error);
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

    const doctors = users.filter((user) => user.role === "doctor");

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
                    {doctors.length > 0 ? (
                        doctors.map((doctor) => (
                            <tr key={doctor._id}>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.status || "Pending"}</td>
                                <td>
                                    <button id="approve-button" onClick={() => approveDoctor(doctor._id)} disabled={doctor.status === "approved"}>
                                        Approve
                                    </button>
                                    <button id="delete-button" onClick={() => rejectDoctor(doctor._id)}>Reject</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: "center", fontWeight: "bold", padding: "10px" }}>
                                No new doctor registrations
                            </td>
                        </tr>
                    )}
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
        {users.filter((user) => user.role !== "admin").length > 0 ? (
            users
                .filter((user) => user.role !== "admin") // Exclude admin users
                .map((user) => (
                    <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                            <button id="delete-button" onClick={() => deleteUser(user._id)}>Delete</button>
                        </td>
                    </tr>
                ))
        ) : (
            <tr>
                <td colSpan="4" style={{ textAlign: "center", fontWeight: "bold", padding: "10px" }}>
                    No users available
                </td>
            </tr>
        )}
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
        {appointments.length > 0 ? (
            appointments.map((appointment) => (
                <tr key={appointment._id}>
                    <td>{appointment.doctorId?.name || "Not Assigned"}</td>
                    <td>{appointment.name}</td>
                    <td>{appointment.email}</td>
                    <td>{appointment.contact}</td>
                    <td>{appointment.age}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.status || "Pending"}</td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan="7" style={{ textAlign: "center", fontWeight: "bold", padding: "10px" }}>
                    No appointments available
                </td>
            </tr>
        )}
    </tbody>
</table>

        </div>
    );
};

export default AdminDashboard;
