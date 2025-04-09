import Flashcard from "../Flashcard"; // importing the component we are testing
import '@testing-library/jest-dom';
import {render,screen, fireEvent} from '@testing-library/react';

describe("Flashcard", () => {
    const word = {
        word:"abate",
        meaning:"to reduce in intensity",
        example:"The storm suddenly abated."
    };

    it("renders the word on the front", () => {
        render(<Flashcard word={word} />);
        const headings = screen.getAllByText(word.word);
        expect(headings[0]).toBeInTheDocument();
    });

    it("flips to back and shows meaning and example", () => {
        render(<Flashcard word={word} />);
        // const card = screen.getAllByText(word.word)[0].closest(".flashcard-container");
       const card = screen.getByTestId("flashcard");
        fireEvent.click(card);
        expect(screen.getByText(word.example)).toBeInTheDocument();
        expect(screen.getByText(word.meaning)).toBeInTheDocument(); 
});
});