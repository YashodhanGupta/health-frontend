import React, { useEffect } from "react";


const Contact = () => {
  useEffect(() => {
  
    if (!document.querySelector('script[src="https://static-bundles.visme.co/forms/vismeforms-embed.js"]')) {
      const script = document.createElement("script");
      script.src = "https://static-bundles.visme.co/forms/vismeforms-embed.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        // Remove script on component unmount
        if (script) {
          document.body.removeChild(script);
        }
      };
    }
  }, []);

  return (
    <section
  id="contact"
  style={{
    padding: "50px 0",
    textAlign: "center",
    backgroundColor: "transparent",
    color: "#333",
  }}
>
  <h2 
    style={{ 
      fontSize: "28px", 
      fontWeight: "bold", 
      color: "#333", 
      marginBottom: "1px" // Reduce space below heading
    }}
  >
    Contact Me
  </h2>

  <div 
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transform: "scale(1.2)", // Adjust zoom
      transformOrigin: "center",
    }}
  >
    <div
      className="visme_d"
      data-title="Contact Us Contact Form"
      data-url="8rgqem9q-contact-us-contact-form?fullPage=true"
      data-domain="forms"
      data-full-page="false"
      data-min-height="600px"
      data-form-id="117290"
      style={{
        marginTop: "0px", // Remove extra space
        paddingTop: "0px" 
      }}
    ></div>
  </div>
</section>

  );
};

export default Contact;