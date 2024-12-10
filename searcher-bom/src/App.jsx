import React, { useState } from "react";
import axios from "axios";
import SearchResults from "./SearchResults";

function App() {
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [results, setResults] = useState([]);
  const [caseSensitive, setCaseSensitive] = useState(false);

  const handleSearch = async () => {
    if (!search.trim()) return;

    try {
      const response = await axios.post("http://localhost:5000/search", {
        search: search,
        case_sensitive: caseSensitive,
      });
      setResults(response.data);
      setSubmittedSearch(search); // Update the submitted search term
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Book of Mormon Search</h1>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "0.5rem", width: "300px" }}
      />
      <button onClick={handleSearch} style={{ padding: "0.5rem", marginLeft: "10px" }}>
        Search
      </button>
      <div style={{ marginTop: "1rem" }}>
        <label>
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
          />
          Case Sensitive
        </label>
      </div>
      <SearchResults results={results} searchTerm={submittedSearch} />
    </div>
  );
}

export default App;