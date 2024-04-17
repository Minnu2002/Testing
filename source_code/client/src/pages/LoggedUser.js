import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LoggedUser = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get("http://localhost:9000/user-details", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setErrorMessage("Error fetching user details");
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/login"); // Redirect to login page after logout
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userDetails) {
    return <div>{errorMessage}</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h1>Welcome, {userDetails.username}!</h1>
          <ul className="list-group">
            <li className="list-group-item">
              Username: {userDetails.username}
            </li>
            <li className="list-group-item">Age: {userDetails.age}</li>
            <li className="list-group-item">Country: {userDetails.country}</li>
            <li className="list-group-item">Phone: {userDetails.phone}</li>
          </ul>
        </div>
        <div className="col-md-6">
          <button
            className="btn btn-danger mt-3 mt-md-0"
            onClick={handleLogout}
          >
            Logout
          </button>{" "}
          {/* Logout button with redirection */}
        </div>
      </div>
    </div>
  );
};

export default LoggedUser;
