import React, { useEffect, useState } from "react";
import axios from "axios";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get("https://health-backend-3zzb.onrender.com/api/appointments")
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error(err));
  }, []);

  const cancelAppointment = (id) => {
    axios.delete(`https://health-backend-3zzb.onrender.com/api/appointments/${id}`)
      .then(() => {
        alert("Appointment cancelled successfully!");
        setAppointments(appointments.filter((appt) => appt._id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <ul>
        {appointments.map((appt) => (
          <li key={appt._id}>
            {appt.doctorName} - {appt.date}
            <button onClick={() => cancelAppointment(appt._id)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
