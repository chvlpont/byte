import "./ContactForm.css";
import React, { useState } from "react";
import { validate } from "../utils/validate";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [messageSent, setMessageSent] = useState(false);

  const handleChange = (e) => {
    setFormData((data) => {
      return {
        ...data,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate(formData, setFormErrors)) return;

    // Send message to API

    try {
      const response = await fetch("http://localhost:9999/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.status === 200) {
        console.log("Data successfully sent to the API, Status: 200");
        setMessageSent(true);
      } else {
        console.error("Failed to send data to the API");

        const responseBody = await response.json();
        console.error("Error response from the server:", responseBody);
      }
    } catch (error) {
      console.error("Error while sending data to the API:", error);
    }
  };

  const handleClose = () => {
    setMessageSent(false);
  };

  return (
    <>
      <div className="popup-container">
        {messageSent && (
          <div className="success-message">
            <p>Message sent!</p>
            <button className="popup-button" onClick={handleClose}>
              Close
            </button>
          </div>
        )}
      </div>
      <div className="contact-container">
        <div className="contact-form-and-title">
          <div className="contact-title">
            <h1>Contact Us</h1>
          </div>
          <div className="contact-form-and-image">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-group">
                <div className="form-title">
                  <h2>Contact Us</h2>
                </div>
                <label className="form-label" htmlFor="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input"
                ></input>
                {formErrors.firstName && (
                  <p className="error-message">{formErrors.firstName}</p>
                )}
              </div>

              <div className="contact-group">
                <label className="form-label" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input"
                ></input>
                {formErrors.lastName && (
                  <p className="error-message">{formErrors.lastName}</p>
                )}
              </div>

              <div className="contact-group">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input"
                ></input>
                {formErrors.email && (
                  <p className="error-message">{formErrors.email}</p>
                )}
              </div>

              <div className="contact-group">
                <label className="form-label" htmlFor="message">
                  Message
                </label>
                <input
                  type="text"
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="input"
                ></input>
                {formErrors.message && (
                  <p className="error-message">{formErrors.message}</p>
                )}
              </div>
              <div>
                <button className="form-button">Send</button>
              </div>
            </form>
            <div className="form-img">
              <img src="/src/images/bg1.png"></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
