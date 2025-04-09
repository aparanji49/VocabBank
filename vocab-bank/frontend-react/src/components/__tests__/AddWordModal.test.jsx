import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddWordModal from "../AddWordModal";
import "@testing-library/jest-dom";

// Mock fetch globally
beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            word: "abate",
            meaning: "to reduce",
            example: "The storm abated.",
          }),
      })
    );
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

describe("AddWordModal", () => {
  // test 1
  it("opens the modal when the button is clicked", () => {
    render(<AddWordModal onAdd={() => {}} />);
    fireEvent.click(screen.getByText("+ Add New Word"));
    expect(screen.getByText("Add a Word")).toBeInTheDocument();
  });

  // test 2
  it("calls onAdd with form data when submitted", async () => {
    const handleAdd = jest.fn();
    render(<AddWordModal onAdd={handleAdd} />);

    const user = userEvent.setup();

    await user.click(screen.getByText("+ Add New Word"));

    await user.type(screen.getByPlaceholderText("Word"), "abate");
    await user.type(screen.getByPlaceholderText("Meaning"), "to reduce");
    await user.type(screen.getByPlaceholderText("Example Sentence"), "The storm abated.");
    
    await user.click(screen.getByText("Add"));


    expect(handleAdd).toHaveBeenCalledWith({
      word: "abate",
      meaning: "to reduce",
      example: "The storm abated.",
    });
  });
  // test 3
  it("does not call onAdd if a field is missing", () => {
    const handleAdd = jest.fn();
    render(<AddWordModal onAdd={handleAdd} />);
    fireEvent.click(screen.getByText("+ Add New Word"));

    // Only fill word and meaning
    fireEvent.change(screen.getByPlaceholderText("Word"), {
      target: { value: "abate" },
    });
    fireEvent.change(screen.getByPlaceholderText("Meaning"), {
      target: { value: "to reduce" },
    });

    fireEvent.click(screen.getByText("Add"));

    expect(handleAdd).not.toHaveBeenCalled();
  });

  // test 4
  it("closes the modal on Cancel click", () => {
    render(<AddWordModal onAdd={() => {}} />);
    fireEvent.click(screen.getByText("+ Add New Word"));
    fireEvent.click(screen.getByText("Cancel"));

    expect(screen.queryByText("Add a Word")).not.toBeInTheDocument();
  });
});
