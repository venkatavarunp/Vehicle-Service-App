import React, { useState, useEffect } from "react";
import { getComponents, getVehicles, postIssue } from "../api";
import "../styles/forms.css";

const AddIssue = () => {
  const [description, setDescription] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [isRepair, setIsRepair] = useState(true);
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [components, setComponents] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await getComponents();
        setComponents(response.data);
      } catch (error) {
        console.error("Error fetching components:", error);
      }
    };

    const fetchVehicles = async () => {
      try {
        const response = await getVehicles();
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchComponents();
    fetchVehicles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postIssue({
        description,
        vehicle: vehicleId,
        is_repair: isRepair,
        components: selectedComponents,
      });
      alert("Issue added successfully!");
      setDescription("");
      setVehicleId("");
      setIsRepair(true);
      setSelectedComponents([]);
    } catch (error) {
      console.error("Error adding issue:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Issue</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Vehicle:</label>
          <select
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            required
          >
            <option value="">Select Vehicle</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.plate_number} - {vehicle.model}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Type:</label>
          <select
            value={isRepair}
            onChange={(e) => setIsRepair(e.target.value === "true")}
          >
            <option value={true}>Repair</option>
            <option value={false}>New Purchase</option>
          </select>
        </div>
        <div>
          <label>Components:</label>
          {components.map((component) => (
            <div key={component.id}>
              <input
                type="checkbox"
                value={component.id}
                checked={selectedComponents.includes(component.id)}
                onChange={(e) => {
                  const id = parseInt(e.target.value);
                  setSelectedComponents((prev) =>
                    prev.includes(id)
                      ? prev.filter((c) => c !== id)
                      : [...prev, id]
                  );
                }}
              />
              {component.name}
            </div>
          ))}
        </div>
        <button type="submit">Add Issue</button>
      </form>
    </div>
  );
};

export default AddIssue;
