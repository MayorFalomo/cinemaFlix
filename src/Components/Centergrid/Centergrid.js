import React, { useEffect, useRef, useState } from "react";
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
  setSelectedTrend,
  playMovieTrailer,
  setPlayMovieTrailer,
  watchList,
  setWatchList,
  playMovie,
  menuActive,
  setMenuActive,
  hamburgerMenu,
  setHamburgerMenu,
  genres,
  setGenres,
  playTrendingMovieTrailer,
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

  const [currentSlider, setCurrentSlider] = useState(0);

  // const handleSlideChange = (newSlide) => {
  //   setCurrentSlide(newSlide);
  // };

  const carouselRef = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleAfterChange = (currentSlide) => {
    setCurrentSlideIndex(currentSlide);
  };

  // useEffect(() => {
  //   if (carouselRef.current) {
  //     setCurrentSlideIndex(carouselRef.current.state.currentSlide);
  //   }
  // }, []);

  // console.log(movies);
  // console.log(currentSlideIndex, "currentslide");

  // console.log(movies[currentSlideIndex]);
  return (
    <div className="centerContainer">
      <div className="centerGridCard">
        <div id="navId" className="centerNav">
          <form onSubmit={searchMovies}>
            <div className="searchInput">
              <input
                onChange={(e) => setSearchInput(e.target.value)}
                typeof="text"
                placeholder="Search Movies..."
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
            <p
              onClick={() => setMenuActive(!menuActive)}
              className={menuActive ? "burgerX" : "burgerActiveX"}
              style={{ cursor: "pointer" }}
            >
              {<FaTimes className="burgerMenu" cursor="pointer" />}{" "}
            </p>
          ) : (
            <p
              onClick={() => setMenuActive(!menuActive)}
              className={menuActive ? "burgerActive" : "burger"}
              style={{ cursor: "pointer" }}
            >
              {<BiMenuAltRight className="burgerMenuBar" />}{" "}
            </p>
          )}

          <div className="burgerContainer">
            {" "}
            {hamburgerMenu ? (
              <p
                onClick={() => setHamburgerMenu(!hamburgerMenu)}
                className={
                  hamburgerMenu ? "TimesHamburgerMenu" : "hamburgerMenuActive"
                }
                style={{ cursor: "pointer" }}
              >
                {<FaTimes className="burgerMenu" />}{" "}
              </p>
            ) : (
              <p
                onClick={() => setHamburgerMenu(!hamburgerMenu)}
                className={hamburgerMenu ? "hamMenu active" : "hamburgerLinks"}
                style={{ cursor: "pointer" }}
              >
                {<BiMenuAltRight className="burgerMenu" />}{" "}
              </p>
            )}
          </div>
        </div>
        <h1>Trending Movie 🔥 </h1>
        <Carousel
          // slidesToSlide={handleSlideChange}
          // partialVisible={true}
          ref={carouselRef}
          afterChange={handleAfterChange}
          // {...props}
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          keyBoardControl={true}
          customTransition="all 0.4s ease"
          transitionDuration={2000}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
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
                setSelectedTrend={setSelectedTrend}
                playMovieTrailer={playMovieTrailer}
                setPlayMovieTrailer={setPlayMovieTrailer}
                playMovie={playMovie}
                watchList={watchList}
                setWatchList={setWatchList}
                genres={genres}
                playTrendingMovieTrailer={playTrendingMovieTrailer}
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
          genres={genres}
          setGenres={setGenres}
        />
        <Popular
          topRated={topRated}
          popular={popular}
          watchList={watchList}
          setWatchList={setWatchList}
          genres={genres}
        />
      </div>
    </div>
  );
};

export default Centergrid;
