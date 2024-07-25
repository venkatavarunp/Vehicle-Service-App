import React, { useState, useEffect } from "react";
import { getComponents } from "../api";
import "../styles/lists.css";

const ComponentList = () => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await getComponents();
        setComponents(response.data);
      } catch (error) {
        console.error("Error fetching components:", error);
      }
    };

    fetchComponents();
  }, []);

  return (
    <div className="list-container">
      <h2>Component List</h2>
      <ul>
        {components.map((component) => (
          <li key={component.id}>
            {component.name} - Repair Price: ${component.repair_price} -
            Purchase Price: ${component.purchase_price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComponentList;
