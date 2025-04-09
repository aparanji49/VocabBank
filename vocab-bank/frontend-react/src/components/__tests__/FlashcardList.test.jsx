import FlashcardList from "../FlashcardList";

import '@testing-library/jest-dom';
import {render,screen} from '@testing-library/react';

jest.mock("../Flashcard", () => ({word}) => (
    <div data-testid="flashcard">{word.word}</div>
));

describe("FlashcardList", () => {
// test 1
it("shows message when no words are passed", () => {
// render component with empty words list - now words to display
    render(<FlashcardList words={[]}/>);
// expect scree to have the message
    expect(screen.getByText("No words found. Try searching or adding new ones.")).toBeInTheDocument();
});
// test 2
it("renders flashcards when words are passed", () => {
// sample words
const sampleWords = [{
    word:"abate", meaning:"to reduce", example:"The storm abated."
},{
    word:"benevolent", meaning:"kind", example:"A benevolent leader."
}];
// render component with sample words
render(<FlashcardList words={sampleWords}/>);
// expect length of cards - number of cards = number of given sample words
const cards = screen.getAllByTestId("flashcard");
expect(cards.length).toBe(2);

// expect those cards to have text with the same word
expect(cards[0]).toHaveTextContent("abate");
expect(cards[1]).toHaveTextContent("benevolent");
});
});