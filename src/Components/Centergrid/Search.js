import React, { useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import Results from "./Results";
import "./Search.css";

const Search = ({ searchResults }) => {
  const [searchActive, setSearchActive] = useState(false);
  return (
    <div className="searchContainer">
      <div className="searchFlex">
        <h1>Search Results: </h1>
        <ul className={searchActive ? "searchMenu" : "navItems"}>
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
        <div className="burgerContainer">
          {" "}
          {searchActive ? (
            <div
              onClick={() => setSearchActive(!searchActive)}
              className={searchActive ? "Times active" : "timesInActive"}
            >
              <p>{<FaTimes className="burgerMenu" />} </p>{" "}
            </div>
          ) : (
            <div
              onClick={() => setSearchActive(!searchActive)}
              className={searchActive ? "activeMenu" : "inActiveMenu"}
            >
              <p>{<BiMenuAltRight className="burgerMenu" />} </p>
            </div>
          )}
        </div>
      </div>
      <div className="searchCard">
        {searchResults.map((search) => {
          return (
            <div className="searchArea" key={search.id}>
              <Results search={search} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
