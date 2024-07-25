import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterComponent from "./components/RegisterComponent";
import AddVehicle from "./components/AddVehicle";
import AddIssue from "./components/AddIssue";
import ComponentList from "./components/ComponentList";
import VehicleList from "./components/VehicleList";
import IssueList from "./components/IssueList";
import RevenueChart from "./components/RevenueChart";

const App = () => {
  return (
    <Router>
      <div>
        <h1>Vehicle Service System</h1>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/register-component">Register Component</a>
            </li>
            <li>
              <a href="/add-vehicle">Add Vehicle</a>
            </li>
            <li>
              <a href="/add-issue">Add Issue</a>
            </li>
            <li>
              <a href="/components">Components List</a>
            </li>
            <li>
              <a href="/vehicles">Vehicles List</a>
            </li>
            <li>
              <a href="/issues">Issues List</a>
            </li>
            <li>
              <a href="/revenue">Revenue Charts</a>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register-component" element={<RegisterComponent />} />
          <Route path="/add-vehicle" element={<AddVehicle />} />
          <Route path="/add-issue" element={<AddIssue />} />
          <Route path="/components" element={<ComponentList />} />
          <Route path="/vehicles" element={<VehicleList />} />
          <Route path="/issues" element={<IssueList />} />
          <Route path="/revenue" element={<RevenueCharts />} />
        </Routes>
      </div>
    </Router>
  );
};

const Home = () => (
  <div>
    <h2>Welcome to the Vehicle Service System</h2>
    <p>Select an option from the menu to get started.</p>
  </div>
);

const RevenueCharts = () => (
  <div>
    <h2>Revenue Charts</h2>
    <RevenueChart period="daily" />
    <RevenueChart period="monthly" />
    <RevenueChart period="yearly" />
  </div>
);

export default App;
