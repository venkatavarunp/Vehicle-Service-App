import React, { useState, useEffect } from "react";
import { getIssues } from "../api";
import "../styles/lists.css";

const IssueList = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await getIssues();
        setIssues(response.data);
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    };

    fetchIssues();
  }, []);

  return (
    <div className="list-container">
      <h2>Issue List</h2>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            {issue.description} - {issue.is_repair ? "Repair" : "New Purchase"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IssueList;
