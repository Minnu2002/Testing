import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    age: "",
    country: "",
    phone: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000); // Clear error message after 5 seconds
      return;
    }
    try {
      await axios.post("http://localhost:9000/signup", signupData);
      alert("User signed up successfully");
      navigate("/login");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setErrorMessage(err.response.data);
      } else {
        setErrorMessage("Error signing up");
      }
      setTimeout(() => {
        setErrorMessage("");
      }, 5000); // Clear error message after 5 seconds
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center mb-4">Sign Up</h5>
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
              <form onSubmit={handleSignupSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    name="username"
                    value={signupData.username}
                    onChange={handleSignupChange}
                    className="form-control"
                    placeholder="Username"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    className="form-control"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={signupData.confirmPassword}
                    onChange={handleSignupChange}
                    className="form-control"
                    placeholder="Confirm Password"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    name="age"
                    value={signupData.age}
                    onChange={handleSignupChange}
                    className="form-control"
                    placeholder="Age"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="country"
                    value={signupData.country}
                    onChange={handleSignupChange}
                    className="form-control"
                    placeholder="Country"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="tel"
                    name="phone"
                    value={signupData.phone}
                    onChange={handleSignupChange}
                    className="form-control"
                    placeholder="Phone Number"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Sign Up
                </button>
              </form>
              <p className="mt-3">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
