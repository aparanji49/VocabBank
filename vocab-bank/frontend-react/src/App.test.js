import { render, screen } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

// 🧪 Mock fetch so App doesn't try to hit real backend
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          page: 1,
          totalPages: 1,
          totalWords: 1,
          words: [
            {
              word: "abate",
              meaning: "to reduce",
              example: "The storm abated.",
            },
          ],
        }),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

test("renders the heading and word card", async () => {
  render(<App />);
  expect(await screen.findByText(/vocab bank/i)).toBeInTheDocument();
  const allAbates = await screen.findAllByText("abate");
  expect(allAbates.length).toBeGreaterThanOrEqual(1); // you expect at least one
});

test("shows error when API fails", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ error: "Error fetching data" }),
    })
  );

  render(<App />);
  // const errMsg = await screen.findByText("Error fetching data");
  const errMsg = await screen.findByText((content) =>
    content.toLowerCase().includes("error")
  );
  expect(errMsg).toBeInTheDocument();
});
