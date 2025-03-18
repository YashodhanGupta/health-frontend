import React from "react";
import "../styles/About.css";

const doctors = [
    { name: "Dr. Raj Mehta",experience:"15+ years", specialty: "Veterinary Cardiologist", image: "https://media.istockphoto.com/id/177373093/photo/indian-male-doctor.jpg?s=612x612&w=0&k=20&c=5FkfKdCYERkAg65cQtdqeO_D0JMv6vrEdPw3mX1Lkfg=" },
    { name: "Dr. Vivek Sharma",experience:"8 years", specialty: "Veterinary Dermatologist", image: "https://t4.ftcdn.net/jpg/07/07/89/33/360_F_707893394_5DEhlBjWOmse1nyu0rC9T7ZRvsAFDkYC.jpg" },
    { name: "Dr. Sara Patel", experience:"8.5 years",specialty: "Veterinary Neurologist", image: "https://img.freepik.com/free-photo/medium-shot-smiley-doctor-with-coat_23-2148814212.jpg" },
    { name: "Dr. Rahul Williams", experience:"5+ years",specialty: "Veterinary Orthopedic Surgeon", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZG9jdG9yfGVufDB8fDB8fHww" },
    { name: "Dr. Neha Verma", experience:"10+ years",specialty: "Veterinary Pediatrician", image: "https://plus.unsplash.com/premium_photo-1661580574627-9211124e5c3f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZG9jdG9yfGVufDB8fDB8fHww" },
    { name: "Dr. Sameer Reddy", experience:"3+ years",specialty: " Veterinary Practitioner", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D" }
];


const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="container">
                <center><h2>About Us</h2></center>
                <p>
                <b>Welcome to Our TailCare Pets Hospital!</b> 🐾❤️
                </p>
                <p>
                At our Pet Healthcare Hospital, we understand that your furry friends are not just pets—they are family. We are dedicated to providing compassionate, high-quality veterinary care to ensure your beloved companions live long, happy, and healthy lives.
                </p>
                <p>
                With a team of experienced veterinarians and animal lovers, we offer comprehensive medical care, emergency services, vaccinations, and specialized treatments tailored to your pet’s unique needs. Whether it’s a routine check-up, a sudden illness, or just a comforting touch, we are here to support you and your pet at every step.
                </p>
                <p>
                We believe that every tail wag, every purr, and every loving nuzzle deserves the best care possible. Trust us to be your pet’s second home—where health, love, and warmth come together.
                </p>
                <p>
                🐶🐱 <b>Because they love us unconditionally, and they deserve nothing less than the best.</b> 🐾💕
                </p>
                
                {/* Meet Our Doctors Section */}
               <center><h2 className="section-title">Meet Our Doctors</h2></center> 
                <div className="projects-container">
                    {doctors.map((doctor, index) => (
                        <div key={index} className="project-card">
                            <img src={doctor.image} alt={doctor.name} className="project-img" />
                            <h3 className="project-title">{doctor.name}</h3>
                            <p className="project-languages"><b>Experience:</b> {doctor.experience}</p>
                            <p className="project-languages">({doctor.specialty})</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
