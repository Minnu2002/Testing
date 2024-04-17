import React, { useState, useEffect } from "react";

// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

function ApiInfo() {
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.spacexdata.com/v4/launches/past"
      );
      const jsonData = await response.json();
      setLaunches(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">SpaceX Launches</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Mission Name</th>
            <th>Date</th>
            <th>Rocket Name</th>
            <th>Details</th>
            <th>Patch Image</th>
          </tr>
        </thead>
        <tbody>
          {launches.map((launch, index) => (
            <tr key={index}>
              <td>{launch.flight_number}</td>
              <td>{launch.name}</td>
              <td>{new Date(launch.date_utc).toLocaleDateString()}</td>
              <td>{launch.rocket}</td>
              <td>{launch.details || "No details available"}</td>
              <td>
                {launch.links && launch.links.patch && (
                  <img
                    src={launch.links.patch.small}
                    alt={`Patch ${index}`}
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApiInfo;
