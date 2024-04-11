import { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset previous error messages
    setEmailError("");
    setPasswordError("");

    if (email.trim() === "") {
      setEmailError("This field is necessary");
    }

    if (password.trim() === "") {
      setPasswordError("This field is necessary");
    }

    if (emailError || passwordError) {
      // One or both fields are empty, do not proceed with login
      return;
    }

    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:9999/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();

      if (response.status === 200) {
        console.log("Login successful");
        console.log("Token:", responseData.token);
        // Call the login function from the authentication context to set the token
        login(responseData.token);
        // Handle successful login, such as redirecting the user or setting a token in state
        navigate("/orders");
      } else if (response.status === 401) {
        console.error("Unauthorized: Invalid credentials");
        setPasswordError("Invalid username or password");
      } else {
        console.error("Failed to login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogInClick = () => {
    navigate("/orders");
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1>LOG IN</h1>
      </div>
      <div className="login-right">
        <form onSubmit={handleLogin}>
          <div className="login-right-card">
            <label htmlFor="email" className="login-label">
              Email
            </label>
            <input
              className="login-input"
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
          <div className="login-right-card">
            <label htmlFor="password" className="login-label">
              Password
            </label>
            <input
              className="login-input"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <div className="bottom-text">
            <p>
              No account?{" "}
              <Link to="/register" className="register-link">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
