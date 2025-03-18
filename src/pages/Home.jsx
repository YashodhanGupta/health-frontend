import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Home.css";
import About from "./About"; // ✅ Import About component
import Contact from "./Contact";
import Footer from "./Footer";

const Home = () => {
  return (
    <div id="home" className="home-container">
      {/* ✅ Carousel Section */}
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="/images/image1-1.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            
            <h4>Pets may be only a part of our lives, but to them, we are their whole world.</h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="/images/image2-2.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            
            <h4>The love of a pet is a gift—cherish it, nurture it, and return it in kind.</h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="/images/image3.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            
            <h4>A healthy pet is a happy pet. Care for them like family, because they are.</h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="/images/image4 (1).jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            
            <h4>Animals speak to those who listen. Love and care are their universal languages.</h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="/images/image2-2.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            
            <h4>Every pet deserves love, care, and a happy home. Be their hero every day.</h4>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* ✅ About Section Below */}
      <About />
      <Contact/>
      <Footer/>
    </div>
  );
};

export default Home;