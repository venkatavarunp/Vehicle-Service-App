import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RegisterComponent from "./RegisterComponent";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Set up a mock adapter for axios
const mock = new MockAdapter(axios);

describe("RegisterComponent", () => {
  beforeEach(() => {
    // Reset mock adapter
    mock.reset();
  });

  test("renders form elements", () => {
    render(<RegisterComponent />);
    expect(screen.getByLabelText(/Component Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Repair Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Purchase Price/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });

  test("submits form data", async () => {
    mock.onPost("/api/components").reply(200, { success: true });

    render(<RegisterComponent />);

    fireEvent.change(screen.getByLabelText(/Component Name/i), {
      target: { value: "New Component" },
    });
    fireEvent.change(screen.getByLabelText(/Repair Price/i), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByLabelText(/Purchase Price/i), {
      target: { value: "150" },
    });

    fireEvent.click(screen.getByText(/Register/i));

    expect(
      await screen.findByText(/Component registered successfully/i)
    ).toBeInTheDocument();
  });
});
