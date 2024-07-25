import React, { useState, useEffect } from "react";
import RevenueChart from "./RevenueChart";
import { getRevenueData } from "../api"; // Replace with your API function
import "../styles/charts.css";

const RevenueCharts = () => {
  const [dailyData, setDailyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const daily = await getRevenueData("daily");
        const monthly = await getRevenueData("monthly");
        const yearly = await getRevenueData("yearly");

        setDailyData(daily.data);
        setMonthlyData(monthly.data);
        setYearlyData(yearly.data);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Revenue Charts</h2>
      <RevenueChart data={dailyData} period="daily" />
      <RevenueChart data={monthlyData} period="monthly" />
      <RevenueChart data={yearlyData} period="yearly" />
    </div>
  );
};

export default RevenueCharts;
