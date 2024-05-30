import React, { useEffect } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import Navbarcoming from "../../Components/Rightgrid/Navbarcoming";
import DiscoverNav from "../Discovery/DiscoverNav";
import Seenmovies from "./Seenmovies";
import "./Seenmovie.css";

const Watchlist = ({
  watchList,
  setWatchList,
  topRated,
  setTopRated,
  burgerState,
  setBurgerState,
}) => {
  useEffect(() => {
    const savedMovie = JSON.stringify(watchList);
    localStorage.setItem("watchList", savedMovie);
  }, [watchList]);

  const clearWatchList = () => {
    setWatchList([]);
  };

  const removeMovieBtn = (id) => {
    const removeMovie = watchList.filter(
      (filteredMovie) => filteredMovie.id !== id
    );
    setWatchList(removeMovie);
  };

  return (
    <div className="watchContainer">
      <Navbarcoming
        watchList={watchList}
        burgerState={burgerState}
        setBurgerState={setBurgerState}
      />
      <div className="flexHeading">
        <h1>WatchList </h1>
        <div className="flexingWatch">
          {burgerState ? (
            <div
              className={burgerState ? "hamburgerLinksW" : "hamMenuActiveX"}
              onClick={() => setBurgerState(!burgerState)}
            >
              <p>{<FaTimes className="burgerMenuHam" />}</p>
            </div>
          ) : (
            <div
              className={burgerState ? "hamMenuActive" : "hamburgerLinking"}
              onClick={() => setBurgerState(!burgerState)}
            >
              <p>{<BiMenuAltRight className="burgerMenuHam" />} </p>
            </div>
          )}
          <div className="flexWatch">
            {watchList.length > 0 ? (
              watchList.map((seenMovie, index) => {
                return (
                  <div key={index} className="watchlistCard">
                    <Seenmovies
                      watchList={watchList}
                      seenMovie={seenMovie}
                      clearWatchList={clearWatchList}
                      removeMovieBtn={removeMovieBtn}
                    />
                  </div>
                );
              })
            ) : (
              <div className="emptyText">
                <h1>Your Watchlist is Empty </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
