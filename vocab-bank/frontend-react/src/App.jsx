import "./App.css";
import { useEffect, useState } from "react";
import FlashcardList from "./components/FlashcardList";
import SearchBar from "./components/SearchBar";
import AddWordModal from "./components/AddWordModal";
// import sampleWords from './data/sampleWords'; // if you're using mock data
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faBars } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
function App() {
  // const [words, setWords] = useState(sampleWords);
  const [words, setWords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [reloadTrigger, setReloadTrigger] = useState(false);
  // on page change - load data
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/words?page=${page}&search=${searchQuery}`)
      .then(async (res) => {
        if (!res.ok) {
          const e = await res.json();
          throw new Error(e.error || "Error fetching data");
        }

        return res.json();
      })
      .then((data) => {
        // console.log("api data:", data);
        setWords(data.words);
        setTotalPages(data.totalPages);
        setError(null);
      })
      .catch((e) => {
        // console.log("error message is:"+e.message);
        setError(e.message || "Unexpected error");
      })
      .finally(() => {
        setLoading(false);
        // setError(null);
      });
  }, [page, searchQuery, reloadTrigger]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  const handleAddWord = () => {
    setPage(1);
    setReloadTrigger((prev) => !prev);
  };

  const handleSearchSubmit = () => {
    setPage(1); // Reset to page 1
  };

  return (
    <div className="flex flex-col font-body bg-slate-50 min-h-screen">
      <div className="flex-grow">
        {/* Navbar */}
        <nav className="w-full bg-white shadow-sm p-4 flex justify-between items-center sticky top=0 z-50">
          <h1 className="text-2xl font-heading text-indigo-700">
            <FontAwesomeIcon icon={faBookOpen} /> Vocab Bank
          </h1>
          {/* <button className="sm:hidden text-2xl">
          <FontAwesomeIcon icon={faBars} />
        </button> */}
          <a
            href="https://github.com/aparanji49/VocabBank"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-700 hover:text-indigo-600 transition"
            aria-label="GitHub Repo"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </nav>
        {/* Hero section */}
        <section className="text-center py-10 px-4 bg-slate-50">
          <h2 className="text-3xl sm:text-4xl font-heading text-slate-800 mb-2">
            Mastering Vocabulary - one word at a time.
          </h2>
          <p className="text-slate-600 mb-4">Learn. Add. Retain.</p>
          <AddWordModal onAdd={handleAddWord} />
        </section>
        {/* Search */}
        <SearchBar
          searchQuery={searchQuery}
          onChange={setSearchQuery}
          onSubmit={handleSearchSubmit}
        />
        {/* Flashcards */}
        {loading && (
          <p className="text-center text-gray-500 italic">Loading...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
        <FlashcardList words={words} />
        {/* Pagination - displaying fewer results per page - increases performance and enhances UX */}
        <div className="flex justify-center gap-2 py-6 flex-wrap">
          <button
            className="px-3 py-1 rounded-full border text-gray-600 hover:bg-gray-100"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            &lt;
          </button>

          {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
            const windowStart = Math.max(1, page - 4);
            const windowEnd = Math.min(totalPages, windowStart + 9);
            const pageNumber = windowStart + i;

            if (pageNumber > windowEnd) return null;

            return (
              <button
                key={pageNumber}
                className={`px-3 py-1 rounded-full border ${
                  pageNumber === page
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            className="px-3 py-1 rounded-full border text-gray-600 hover:bg-gray-100"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            &gt;
          </button>
        </div>

        <ToastContainer position="top-center" autoClose={3000} />
      </div>
      <footer className="w-full bg-slate-800 text-white p-4 text-center text-sm m-0">
        <p className="text-sm text-white text-center">
          © 2025 Aparanji Nemmani. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
