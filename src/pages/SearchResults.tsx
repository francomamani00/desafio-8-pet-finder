import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSearchResults } from "../hooks";
import { RedButton } from "../ui/buttons";
function SearchResults() {
  const results = useSearchResults();
  return (
    <ul>
      {results.map((r) => (
        <li key={r.id} className="search-result-item">
          <img className="search-result-item__picture" src={r.thumbnail}></img>
          <div className="search-result-item__data">
            <Link to={"/item/" + r.id}>
              <RedButton>{r.title}</RedButton>
            </Link>
            <p>{r.price}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
export { SearchResults };
