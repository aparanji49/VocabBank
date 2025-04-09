import { useState } from "react";
import { toast } from "react-toastify";
function AddWordModal({ onAdd }) {
  const [isOpen, setIsOpen] = useState(false);
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [example, setExample] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!word || !meaning || !example) return; // if any of these fields are empty

    try{
      // console.log("WORD:", word, "MEANING:", meaning, "EXAMPLE:", example);

      // fetch request to add word api - post request to add word to mongodb and get a ok response along with the added values
      const response = await fetch("https://vocabbank.onrender.com/api/words/add",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({word,meaning,example}),
      });

      // we'll get a response and we're converting it to json
      const result = await response.json();

      // if response is not ok, show error message and return
      if(!response.ok){
        toast.error(result.error || "Failed to add word.");
        return;
      }

      // if response is ok, show success message and update states and close modal

      toast.success("Word Added Successfully! Happy learning!");
      onAdd(result);
      setWord("");
      setMeaning("");
      setExample("");
      setIsOpen(false);

    }catch(e){
      toast.error("Something went wrong. Try Again.");
    }

  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition"
      >
        + Add New Word
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-md space-y-4 w-full max-w-md"
          >
            {/* TODO: Add x icon */}
            <h2 className="text-xl font-semibold text-indigo-700">Add a Word</h2>
            <input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="Word"
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              placeholder="Meaning"
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              value={example}
              onChange={(e) => setExample(e.target.value)}
              placeholder="Example Sentence"
              className="w-full border p-2 rounded"
              required
            />

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default AddWordModal;
