import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
function SearchBar({ searchQuery, onChange, onSubmit }) {
    return (
      <div className="w-full max-w-md mx-auto my-6 px-4">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === "Enter"){
              onsubmit();
            }
          }}
          placeholder="Search for a word..."
          className="w-full px-4 py-2 rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button><FontAwesomeIcon icon={faSearch} /></button>
      </div>

      {searchQuery && (
        <p className="text-sm text-gray-500 text-center mt-2">
          Press <span className="font-semibold">Enter</span> or click 🔍 to search
        </p>
      )}
      </div>
    );
  }
  
  export default SearchBar;
  