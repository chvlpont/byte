import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <div className="black-friday">
        <p>#BlackFriday50%OFF</p>
        <p>#BlackFriday50%OFF</p>
        <p>#BlackFriday50%OFF</p>
      </div>
      <div className="landing-page-title">
        <h1>
          Welcome <br />
          to
          <br />
          BYTE.
        </h1>
      </div>
      <div className="landing-page-text">
        <p>
          We bring you the latest and most innovative devices to elevate your
          election experience.
        </p>
      </div>
      <div className="landing-page-visit-shop">
        <Link to="/products">
          <button>Visit Shop</button>
        </Link>
      </div>
      <video className="video" autoPlay loop playsInline disableRemotePlayback>
        <source src="/src/mp4/electronic.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default LandingPage;
