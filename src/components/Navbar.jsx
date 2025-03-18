import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/patient-dashboard">Doctors</Link>
      <Link to="/view-appointments">View Appointments</Link>
    </nav>
  );
};

export default Navbar;
