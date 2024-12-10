import React from "react";

function SearchResults({ results, searchTerm }) {
  if (!searchTerm.trim()) return null;

  // Function to highlight the search term
  const highlightText = (text, term) => {
    const regex = new RegExp(`(${term})`, 'gi'); // Create a regex to match the term case-insensitively
    const parts = text.split(regex); // Split the text by the search term
    return parts.map((part, index) => 
      regex.test(part) ? <strong key={index}>{part}</strong> : part
    );
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      
      <h2>
        {results.length === 0
          ? `No search results for "${searchTerm}"`
          : `Search Results for "${searchTerm}" (${results.length} ${results.length === 1 ? 'result' : 'results'})`}
      </h2>

      {results.length > 0 ? (
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              <strong>{`${result.book} ${result.chapter}:${result.verse}`}</strong>
              <p>{highlightText(result.text, searchTerm)}</p> {/* Highlighted text */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default SearchResults;