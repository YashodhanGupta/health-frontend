import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("https://health-backend-3zzb.onrender.com/api/auth/users")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.name} - {user.email} ({user.role})</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
