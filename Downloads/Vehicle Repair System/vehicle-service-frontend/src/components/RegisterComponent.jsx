import React, { useState } from "react";
import { postComponent } from "../api";
import "../styles/forms.css";

const RegisterComponent = () => {
  const [name, setName] = useState("");
  const [repairPrice, setRepairPrice] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postComponent({
        name,
        repair_price: repairPrice,
        purchase_price: purchasePrice,
      });
      alert("Component registered successfully!");
      setName("");
      setRepairPrice("");
      setPurchasePrice("");
    } catch (error) {
      console.error("Error registering component:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Register Component</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Repair Price:</label>
          <input
            type="number"
            step="0.01"
            value={repairPrice}
            onChange={(e) => setRepairPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Purchase Price:</label>
          <input
            type="number"
            step="0.01"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterComponent;
