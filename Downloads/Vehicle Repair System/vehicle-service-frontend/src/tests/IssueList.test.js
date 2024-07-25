import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import IssueList from "./IssueList";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Set up a mock adapter for axios
const mock = new MockAdapter(axios);

describe("IssueList", () => {
  beforeEach(() => {
    // Reset mock adapter
    mock.reset();
  });

  test("renders issue list", async () => {
    mock.onGet("/api/issues").reply(200, [
      { id: 1, description: "Issue 1", is_repair: true },
      { id: 2, description: "Issue 2", is_repair: false },
    ]);

    render(<IssueList />);

    await waitFor(() => {
      expect(screen.getByText(/Issue 1 - Repair/i)).toBeInTheDocument();
      expect(screen.getByText(/Issue 2 - New Purchase/i)).toBeInTheDocument();
    });
  });
});
