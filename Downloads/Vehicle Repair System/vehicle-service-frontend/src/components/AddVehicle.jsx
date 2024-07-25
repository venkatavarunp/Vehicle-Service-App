import React, { useState } from "react";
import { postVehicle } from "../api";
import "../styles/forms.css";

const AddVehicle = () => {
  const [plateNumber, setPlateNumber] = useState("");
  const [model, setModel] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postVehicle({ plate_number: plateNumber, model });
      alert("Vehicle added successfully!");
      setPlateNumber("");
      setModel("");
    } catch (error) {
      console.error("Error adding vehicle:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Plate Number:</label>
          <input
            type="text"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Model:</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Vehicle</button>
      </form>
    </div>
  );
};

export default AddVehicle;
