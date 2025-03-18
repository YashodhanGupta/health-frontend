import React, { useState, useEffect } from "react";

const BookedAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        // Fetch booked appointments (replace with API call)
        setAppointments([
            { id: 1, patient: "John Doe", time: "10:00 AM" },
            { id: 2, patient: "Jane Smith", time: "2:30 PM" }
        ]);
    }, []);

    const cancelAppointment = (id) => {
        setAppointments(appointments.filter((appt) => appt.id !== id));
    };

    return (
        <div>
            <h3>Manage Appointments</h3>
            <ul>
                {appointments.map((appt) => (
                    <li key={appt.id}>
                        {appt.patient} - {appt.time}
                        <button onClick={() => cancelAppointment(appt.id)}>Cancel</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookedAppointments;
