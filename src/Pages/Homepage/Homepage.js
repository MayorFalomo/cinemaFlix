import React from "react";
import Centergrid from "../../Components/Centergrid/Centergrid";
import Navbar from "../../Components/Navbar/Navbar";
import Rightgrid from "../../Components/Rightgrid/Rightgrid";
import "./Homepage.css";
import Search from "../../Components/Centergrid/Search";

const Homepage = ({
  movies,
  setMovies,
  selectedTrend,
  setSelectedTrend,
  playMovieTrailer,
  setPlayMovieTrailer,
  searchInput,
  setSearchInput,
  searchResults,
  setSearchResults,
  toggleState,
  setToggleState,
  topRated,
  upComing,
  setUpComing,
  popular,
  setPopular,
  fetchMovies,
  watchList,
  setWatchList,
  seeMore,
  setSeeMore,
  menuActive,
  setMenuActive,
  hamburgerMenu,
  setHamburgerMenu,
  playMovie,
  genres,
  playTrendingMovieTrailer,
}) => {
  return (
    <div className="homeContainer">
      <Navbar
        watchList={watchList}
        upComing={upComing}
        setUpComing={setUpComing}
        hamburgerMenu={hamburgerMenu}
        setHamburgerMenu={setHamburgerMenu}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
      />
      {toggleState ? (
        <div>
          <Search
            watchList={watchList}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
            hamburgerMenu={hamburgerMenu}
            setHamburgerMenu={setHamburgerMenu}
            menuActive={menuActive}
            setMenuActive={setMenuActive}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            toggleState={toggleState}
            setToggleState={setToggleState}
            fetchMovies={fetchMovies}
          />
        </div>
      ) : (
        <Centergrid
          movies={movies}
          selectedTrend={selectedTrend}
          setSelectedTrend={setSelectedTrend}
          topRated={topRated}
          setMovies={setMovies}
          popular={popular}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          toggleState={toggleState}
          setToggleState={setToggleState}
          fetchMovies={fetchMovies}
          watchList={watchList}
          setWatchList={setWatchList}
          playMovieTrailer={playMovieTrailer}
          setPlayMovieTrailer={setPlayMovieTrailer}
          menuActive={menuActive}
          setMenuActive={setMenuActive}
          hamburgerMenu={hamburgerMenu}
          setHamburgerMenu={setHamburgerMenu}
          genres={genres}
          playTrendingMovieTrailer={playTrendingMovieTrailer}
        />
      )}
      <Rightgrid
        watchList={watchList}
        upComing={upComing}
        setUpComing={setUpComing}
        hamburgerMenu={hamburgerMenu}
        setHamburgerMenu={setHamburgerMenu}
        seeMore={seeMore}
        setSeeMore={setSeeMore}
        menuActive={menuActive}
        setMenuActive={setMenuActive}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        genres={genres}
      />
    </div>
  );
};

export default Homepage;
