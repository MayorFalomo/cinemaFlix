import React from "react";
import { Link } from "react-router-dom";
import Results from "./Results";
import "./Search.css";

const Search = ({
  watchList,
  upComing,
  setUpComing,
  hamburgerMenu,
  setHamburgerMenu,
  MenuseeMore,
  menuActive,
  setMenuActive,
  seeMore,
  setSeeMore,
  searchInput,
  setSearchInput,
  searchResults,
}) => {
  return (
    <div className="searchContainer">
      <div className="searchFlex">
        <h1>Search Results: </h1>
        <ul className="navItem">
          <Link to="/">
            <li>Home </li>
          </Link>
          <Link to="/series">
            <li>Series </li>
          </Link>
          <Link to="/discover">
            <li>Discover </li>{" "}
          </Link>
        </ul>
      </div>
      <div className="searchCard">
        {searchResults.map((search) => {
          return (
            <div key={search.id}>
              <Results search={search} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
