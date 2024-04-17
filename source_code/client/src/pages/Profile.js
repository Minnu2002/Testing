import React, { useState } from "react";
import profile from "../assets/profile.jpeg";

function Profile() {
  const [name, setName] = useState("Sushma Kasarla");
  const [biography, setBiography] = useState(
    "I am sushma kasarla pursuing masters from suny albany, I have completed my bachelors in CSE, I have worked as assosicate packaged developer for 3 months in accenture"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedBiography, setEditedBiography] = useState(biography);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setName(editedName);
    setBiography(editedBiography);
  };

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleBiographyChange = (e) => {
    setEditedBiography(e.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <div style={{ flex: "0 0 auto", margin: "20px 20px 0 20px" }}>
        <img
          src={profile}
          alt="Profile"
          style={{
            width: "100%",
            maxWidth: "300px",
            height: "auto",
          }}
        />
        {!isEditing && (
          <button
            onClick={handleEdit}
            style={{ width: "50%", marginTop: "10px" }}
          >
            Edit
          </button>
        )}
      </div>
      <div style={{ flex: "1 1 300px", margin: "20px 20px 0 0" }}>
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={handleNameChange}
            style={{ marginBottom: "10px", width: "100%" }}
          />
        ) : (
          <h3>{name}</h3>
        )}
        {isEditing ? (
          <textarea
            value={editedBiography}
            onChange={handleBiographyChange}
            style={{ width: "100%", height: "150px", marginBottom: "10px" }}
          />
        ) : (
          <p>{biography}</p>
        )}
        {isEditing && (
          <button
            onClick={handleSave}
            style={{ width: "50%", marginTop: "10px" }}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;
