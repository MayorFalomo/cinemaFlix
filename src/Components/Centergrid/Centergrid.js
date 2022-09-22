import React from "react";
import Trending from "./Trending";
import "./Centergrid.css";
import "swiper/css";
import Toprated from "./Toprated";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Popular from "./Popular";
import { Link } from "react-router-dom";
import { BiMenuAltRight, BiSearch } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";

const Centergrid = ({
  movies,
  topRated,
  popular,
  setMovies,
  searchInput,
  setSearchInput,
  searchResults,
  toggleState,
  setToggleState,
  fetchMovies,
  selectedTrend,
  playMovieTrailer,
  setPlayMovieTrailer,
  watchList,
  setWatchList,
  playMovie,
  menuActive,
  setMenuActive,
  hamburgerMenu,
  setHamburgerMenu,
}) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchInput);
    setToggleState(!toggleState);
  };

  return (
    <div className="centerContainer">
      <div className="centerGridCard">
        <div id="navId" className="centerNav">
          <form onSubmit={searchMovies}>
            <div className="searchInput">
              <input
                onChange={(e) => setSearchInput(e.target.value)}
                typeof="text"
                placeholder="Search..."
              />
            </div>
            <button className="navSearchBtn" type={"submit"}>
              {<BiSearch />}{" "}
            </button>
          </form>
          <ul className="navBtnLinks">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/series">
              <li>Series </li>
            </Link>
            <Link to="/discover">
              <li>Discover </li>
            </Link>
          </ul>
          {menuActive ? (
            <div
              onClick={() => setMenuActive(!menuActive)}
              className={menuActive ? "burgerX" : "burgerActiveX"}
            >
              <p>{<FaTimes className="burgerMenu" />} </p>{" "}
            </div>
          ) : (
            <div
              onClick={() => setMenuActive(!menuActive)}
              className={menuActive ? "burgerActive" : "burger"}
            >
              <p>{<BiMenuAltRight className="burgerMenuBar" />} </p>
            </div>
          )}

          <div className="burgerContainer">
            {" "}
            {hamburgerMenu ? (
              <div
                onClick={() => setHamburgerMenu(!hamburgerMenu)}
                className={
                  hamburgerMenu ? "TimesHamburgerMenu" : "hamburgerMenuActive"
                }
              >
                <p>{<FaTimes className="burgerMenu" />} </p>{" "}
              </div>
            ) : (
              <div
                onClick={() => setHamburgerMenu(!hamburgerMenu)}
                className={hamburgerMenu ? "hamMenu active" : "hamburgerLinks"}
              >
                <p>{<BiMenuAltRight className="burgerMenu" />} </p>
              </div>
            )}
          </div>
        </div>
        <h1>Trending Movie 🔥 </h1>
        <Carousel
          // partialVisible={true}
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          keyBoardControl={true}
          customTransition="all 1 ease"
          transitionDuration={2000}
          containerClass="carousel-container"
          // removeArrowOnDeviceType={["tablet", "mobile"]}
          // deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {movies.map((movie) => {
            return (
              <Trending
                key={movie.id}
                movie={movie}
                selectedTrend={selectedTrend}
                playMovieTrailer={playMovieTrailer}
                setPlayMovieTrailer={setPlayMovieTrailer}
                playMovie={playMovie}
              />
            );
          })}
        </Carousel>
        <Toprated
          topRated={topRated}
          movies={movies}
          watchList={watchList}
          setWatchList={setWatchList}
          searchInput={searchInput}
        />
        <Popular
          topRated={topRated}
          popular={popular}
          watchList={watchList}
          setWatchList={setWatchList}
        />
      </div>
    </div>
  );
};

export default Centergrid;
