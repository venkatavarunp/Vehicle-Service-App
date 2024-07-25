import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import RevenueCharts from "./RevenueCharts";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Set up a mock adapter for axios
const mock = new MockAdapter(axios);

describe("RevenueCharts", () => {
  beforeEach(() => {
    // Reset mock adapter
    mock.reset();
  });

  test("renders revenue charts", async () => {
    mock
      .onGet("/api/revenue/daily")
      .reply(200, [{ date: "2024-07-01", revenue: 500 }]);
    mock
      .onGet("/api/revenue/monthly")
      .reply(200, [{ date: "2024-07", revenue: 1500 }]);
    mock
      .onGet("/api/revenue/yearly")
      .reply(200, [{ date: "2024", revenue: 18000 }]);

    render(<RevenueCharts />);

    await waitFor(() => {
      expect(screen.getByText(/Daily Revenue/i)).toBeInTheDocument();
      expect(screen.getByText(/Monthly Revenue/i)).toBeInTheDocument();
      expect(screen.getByText(/Yearly Revenue/i)).toBeInTheDocument();
    });
  });
});
