import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
// import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorList from "./components/DoctorList";
import AppointmentList from "./components/AppointmentList";
import BookAppointment from "./components/BookAppointment";
import ViewAppointments from "./components/ViewAppointments";
import Dashboard from "./components/Dashboard";
import About from "./pages/About";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import DoctorDashboard from "./components/doctor-dashboard/DoctorDashboard";
import AdminDashboard from "./components/admin-dashboard/AdminDashboard";

import Header from "./components/Header"; // ✅ Import the Header component

const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("token"); // Check if user is logged in
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <Header />  {/* ✅ Add Header here so it appears on all pages */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        {/* <Route path="/admin" element={<PrivateRoute element={<AdminDashboard />} />} /> */}
        <Route path="/patient-dashboard" element={<PrivateRoute element={<PatientDashboard />} />} />
        <Route path="/doctor-list" element={<PrivateRoute element={<DoctorList />} />} />
        <Route path="/appointment-list" element={<PrivateRoute element={<AppointmentList />} />} />
        <Route path="/book-appointment/:doctorId/:time" element={<PrivateRoute element={<BookAppointment />} />} />
        <Route path="/view-appointments" element={<PrivateRoute element={<ViewAppointments />} />} />

        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
