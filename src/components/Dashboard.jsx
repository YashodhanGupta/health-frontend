import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2>Welcome to Your Dashboard</h2>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => navigate("/patient-dashboard")}>
          Doctors
        </button>
        <button style={styles.button} onClick={() => navigate("/view-appointments")}>
          View Appointments
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
  },
};

export default Dashboard;
