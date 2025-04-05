import Flashcard from "./Flashcard";

function FlashcardList({ words }) {
  if (!words.length) {
    return (
      <p className="text-center text-gray-500 italic mt-10">
        No words found. Try searching or adding new ones.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-10">
      {words.map((word, index) => (
        <Flashcard key={index} word={word} />
      ))}
    </div>
  );
}

export default FlashcardList;
