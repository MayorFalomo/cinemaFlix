import React from "react";
import { Link } from "react-router-dom";
import Coming from "./Coming";
import "./Rightgrid.css";

const Rightgrid = ({
  upComing,
  setUpComing,
  seeMore,
  setSeeMore,
  menuActive,
  setMenuActive,
  hamburgerMenu,
  setHamburgerMenu,
  searchResults,
  genres,
}) => {
  return (
    <div className={menuActive ? "gridActive" : "RightgridContainer"}>
      <div className="ComingHeader">
        <h2>Upcoming Movies 🍿 </h2>
      </div>
      <div className="flexContainer">
        {upComing?.slice(0, seeMore).map((coming) => {
          return (
            <div className="flexComing" key={coming.id}>
              <Coming
                coming={coming}
                hamburgerMenu={hamburgerMenu}
                setHamburgerMenu={setHamburgerMenu}
              />
            </div>
          );
        })}
      </div>
      <Link to="/upcoming">
        <button className="seeMoreBtn">See More </button>
      </Link>
    </div>
  );
};
export default Rightgrid;
