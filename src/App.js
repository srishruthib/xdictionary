import React, { useState } from 'react';

// Main App component for the XDictionary application
function App() {
  // Initialize the dictionary with the provided array.
  // Using 'meaning' as the key for definitions as per problem statement.
  const initialDictionary = [
    { word: "React", meaning: "A JavaScript library for building user interfaces." },
    { word: "Component", meaning: "A reusable building block in React." },
    { word: "State", meaning: "An object that stores data for a component." }
  ];

  // State to hold the current search term entered by the user
  const [searchTerm, setSearchTerm] = useState("");
  // Unified state to hold either the found meaning or the error message.
  // This ensures a consistent element is always rendered after "Definition:".
  const [displayMessage, setDisplayMessage] = useState("");

  // Function to handle the search logic when the button is clicked or Enter is pressed
  const handleSearch = () => {
    // Trim whitespace from the search term and convert to lowercase for case-insensitive search
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    // Clear previous message before a new search
    setDisplayMessage("");

    // If the search term is empty, do nothing further as per problem context.
    // The problem specifies "Word not found" only for actual searches of non-existent words.
    if (normalizedSearchTerm === "") {
      return;
    }

    // Find the word in the dictionary
    const entry = initialDictionary.find(
      (item) => item.word.toLowerCase() === normalizedSearchTerm
    );

    if (entry) {
      // If word is found, set its meaning to displayMessage
      setDisplayMessage(entry.meaning);
    } else {
      // If word is not found, set the specific error message to displayMessage
      setDisplayMessage("Word not found in the dictionary.");
    }
  };

  // Function to update the searchTerm state as the user types
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    // Clear any previous display message when the user starts typing again
    setDisplayMessage("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* H1 title as per test expectation */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Dictionary App</h1>

        {/* Search input and button container */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={(event) => {
              // Trigger search on Enter key press
              if (event.key === 'Enter') {
                handleSearch();
              }
            }}
            placeholder="Search for a word..."
            className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Search
          </button>
        </div>

        {/* Results display area */}
        <div className="min-h-[80px]"> {/* Added min-height to prevent layout shifts */}
          <div className="definition-box text-left">
            {/* "Definition:" heading is always present as per screenshots */}
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Definition:</h3>
            {/* Always render the paragraph. Its content will be controlled by displayMessage.
                If displayMessage is empty, the paragraph will be empty, which is fine. */}
            <p className={`text-gray-600 leading-relaxed ${displayMessage === "Word not found in the dictionary." ? 'text-red-600 font-medium' : ''}`}>
              {displayMessage}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
