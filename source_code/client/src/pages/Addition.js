import React, { useState } from "react";

function Addition() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [frontendSum, setFrontendSum] = useState("");
  const [backendSum, setBackendSum] = useState("");

  const handleNum1Change = (e) => {
    setNum1(e.target.value);
  };

  const handleNum2Change = (e) => {
    setNum2(e.target.value);
  };

  const handleFrontAddition = () => {
    const result = parseFloat(num1) + parseFloat(num2);
    setFrontendSum(result);
  };

  const handleBackAddition = () => {
    fetch(`http://localhost:9000/add?num1=${num1}&num2=${num2}`)
      .then((response) => response.json())
      .then((data) => {
        setBackendSum(data.sum);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubmit = () => {
    handleFrontAddition();
    handleBackAddition();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginLeft: "20px",
      }}
    >
      <div style={{ marginTop: "20px", marginBottom: "10px", display: "flex" }}>
        <label style={{ marginRight: "60px" }}>Enter First Number:</label>
        <input type="number" value={num1} onChange={handleNum1Change} />
      </div>
      <div
        style={{
          marginTop: "20px",
          marginBottom: "10px",
          display: "flex",
        }}
      >
        <label style={{ marginRight: "40px" }}>Enter Second Number:</label>
        <input type="number" value={num2} onChange={handleNum2Change} />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <button
          className="btn btn-primary"
          style={{ marginTop: "20px" }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <div style={{ marginTop: "10px" }}>
        <h3>Your Addition Result (from server) is: {backendSum}</h3>
        <h3>Your Addition Result (from ReactJs) is: {frontendSum}</h3>
      </div>
    </div>
  );
}

export default Addition;
