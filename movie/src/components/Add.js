import React, { useState } from "react";
import { ResultCard } from "./ResultCard";

export const Add = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const inputWatched = (e) => {
    e.preventDefault();

    setQuery(e.target.value); 

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=1c7c09a65a1976f0157c5fc8f1e38744&query=${query}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (!data.errors) {
          setResults(data.results);
        } else{
          setResults([]);
        }
      });
  };

  return (
    <div className="add-page">
      <div className="container">
        <div className="add-content">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Search for a movie"
              value={query}
              onChange={inputWatched}
            />
          </div>

          {results.length > 0 && (
            <ul className="results">
              {results!==undefined&&results.map((movie) => (
                <li key={movie.id}>
                  <ResultCard movie={movie} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
