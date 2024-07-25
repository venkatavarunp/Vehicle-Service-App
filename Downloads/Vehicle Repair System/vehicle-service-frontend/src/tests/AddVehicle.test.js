import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddVehicle from "./AddVehicle";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Set up a mock adapter for axios
const mock = new MockAdapter(axios);

describe("AddVehicle", () => {
  beforeEach(() => {
    // Reset mock adapter
    mock.reset();
  });

  test("renders form elements", () => {
    render(<AddVehicle />);
    expect(screen.getByLabelText(/Plate Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Model/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Year/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Vehicle/i)).toBeInTheDocument();
  });

  test("submits form data", async () => {
    mock.onPost("/api/vehicles").reply(200, { success: true });

    render(<AddVehicle />);

    fireEvent.change(screen.getByLabelText(/Plate Number/i), {
      target: { value: "XYZ 123" },
    });
    fireEvent.change(screen.getByLabelText(/Model/i), {
      target: { value: "Sedan" },
    });
    fireEvent.change(screen.getByLabelText(/Year/i), {
      target: { value: "2022" },
    });

    fireEvent.click(screen.getByText(/Add Vehicle/i));

    expect(
      await screen.findByText(/Vehicle added successfully/i)
    ).toBeInTheDocument();
  });
});
