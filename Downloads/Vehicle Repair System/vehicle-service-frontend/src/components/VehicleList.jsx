import React, { useState, useEffect } from "react";
import { getVehicles } from "../api";
import "../styles/lists.css";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await getVehicles();
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div className="list-container">
      <h2>Vehicle List</h2>
      <ul>
        {vehicles.map((vehicle) => (
          <li key={vehicle.id}>
            {vehicle.plate_number} - {vehicle.model}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VehicleList;
