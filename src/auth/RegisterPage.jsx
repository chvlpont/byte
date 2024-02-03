import { useState } from "react";
import "./RegisterPage.css";
import { validateRegister } from "../utils/validate";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate the form data
    const isValid = validateRegister(
      { email, password, confirmPassword },
      setFormErrors
    );

    // If form data is not valid, return without making the API call
    if (!isValid) {
      return;
    }

    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(
        "https://js2-ecommerce-api.vercel.app/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      console.log(response);
      const responseData = await response.json();
      console.log(responseData);

      if (response.status === 201) {
        console.log("User created successfully");
        // Handle success, maybe redirect the user to a login page
        console.log("Token:", responseData.token);
        setToken(responseData.token);
      } else {
        console.error("Failed to create user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <h1>REGISTER NEW ACCOUNT</h1>
      </div>
      <div className="register-right">
        <form onSubmit={handleRegister}>
          <div className="register-right-card">
            <label htmlFor="email" className="register-label">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {formErrors.email && (
              <p className="error-message">{formErrors.email}</p>
            )}
          </div>
          <div className="register-right-card">
            <label htmlFor="password" className="register-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {formErrors.password && (
              <p className="error-message">{formErrors.password}</p>
            )}
          </div>
          <div className="register-right-card">
            <label htmlFor="confirmPassword" className="register-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {formErrors.confirmPassword && (
              <p className="error-message">{formErrors.confirmPassword}</p>
            )}
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
