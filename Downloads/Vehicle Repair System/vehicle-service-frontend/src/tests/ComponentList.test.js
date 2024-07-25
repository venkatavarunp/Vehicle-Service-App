import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ComponentList from "./ComponentList";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Set up a mock adapter for axios
const mock = new MockAdapter(axios);

describe("ComponentList", () => {
  beforeEach(() => {
    // Reset mock adapter
    mock.reset();
  });

  test("renders component list", async () => {
    mock.onGet("/api/components").reply(200, [
      { id: 1, name: "Component 1", repair_price: 100, purchase_price: 150 },
      { id: 2, name: "Component 2", repair_price: 200, purchase_price: 250 },
    ]);

    render(<ComponentList />);

    await waitFor(() => {
      expect(
        screen.getByText(
          /Component 1 - Repair Price: \$100 - Purchase Price: \$150/i
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Component 2 - Repair Price: \$200 - Purchase Price: \$250/i
        )
      ).toBeInTheDocument();
    });
  });
});
