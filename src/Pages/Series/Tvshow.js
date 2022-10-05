import React from "react";
import { BiSearch } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import Tvshows from "./Tvshows";

const Tvshow = ({
  popularSeries,
  selectedSeries,
  searchInput,
  setSearchInput,
  fetchSeries,
  setSelectedSeries,
  playSeries,
  playSeriesTrailer,
  setPlaySeriesTrailer,
  watchList,
  setWatchList,
  burgerActive,
  setBurgerActive,
  readMore,
  setReadMore,
}) => {
  const searchSeries = (e) => {
    e.preventDefault();
    fetchSeries(searchInput);
  };

  //   const [playSeriesTrailer, setPlaySeriesTrailer] = useState(false);

  const imgPath = "https://image.tmdb.org/t/p/original";
  const responsive = {
    desktop: {
      breakpoint: { max: 2000, min: 1850 },
      items: 5,
      slidesToSlide: 1, // optional, default to 1.
    },
    system: {
      breakpoint: { max: 1850, min: 1650 },
      items: 4,
      slidesToSlide: 2, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1500, min: 1200 },
      items: 3,
      slidesToSlide: 2, // optional, default to 1.
    },
    tablets: {
      breakpoint: { max: 1200, min: 580 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 580, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  // For the Youtube player
  const playTrailer = () => {
    const trailer = selectedSeries.videos.results.find(
      (vid) => vid.name === "Official Trailer" || "Official Final Trailer"
    );
    return (
      <YouTube
        videoId={trailer.key}
        className="youtube-container"
        opts={{
          width: "100%",
          height: "100%",
        }}
      />
    );
  };

  const effect = () => {
    "<h1>Search Results </h1>;";
  };

  return (
    <div className="showContainer">
      <div className="SeriesnavLink">
        <div className={burgerActive ? "itemClass active" : "itemClass"}>
          <form onSubmit={searchSeries}>
            <div className="form-group">
              <div className="inputCard">
                <input
                  onChange={(e) => setSearchInput(e.target.value)}
                  type={"text"}
                  placeholder="Search Series..."
                />
              </div>
              <button onClick={() => effect()} className="searchBtn">
                {<BiSearch />}{" "}
              </button>
            </div>
          </form>
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
        {burgerActive ? (
          <div
            onClick={() => setBurgerActive(!burgerActive)}
            className={burgerActive ? "fatime active" : "fatime"}
          >
            <button>{<FaTimes className="faCancel" />} </button>
          </div>
        ) : (
          <div
            onClick={() => setBurgerActive(!burgerActive)}
            className={burgerActive ? "hiMenu active" : "himenu"}
          >
            <button>{<HiMenuAlt3 className="HiMenu" />} </button>
          </div>
        )}
      </div>
      <div
        style={{
          backgroundImage: `url(${imgPath}${selectedSeries?.backdrop_path} )`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="HeroContainer"
      >
        <div className="cardText">
          <h1>{selectedSeries?.name} </h1>
          <h1>{selectedSeries?.original_title} </h1>
          <p className="extraInfo">
            Date: {selectedSeries?.first_air_date} |{" "}
            {selectedSeries?.episode_run_time}
            minutes | Seasons: {selectedSeries?.number_of_seasons}
          </p>
          {readMore ? (
            <p className="overView"> {selectedSeries?.overview}</p>
          ) : (
            <p className="overView">{`${selectedSeries?.overview}....`}</p>
          )}
          <p className="seeMore" onClick={() => setReadMore(!readMore)}>
            {readMore ? "Show Less" : "Read More"}{" "}
          </p>
          {selectedSeries?.videos && playSeriesTrailer ? playTrailer() : " "}
          {playSeriesTrailer ? (
            <button
              className="closeBtn"
              onClick={() => setPlaySeriesTrailer(false)}
            >
              Close Trailer{" "}
            </button>
          ) : (
            <button onClick={() => setPlaySeriesTrailer(true)}>
              Play Trailer
            </button>
          )}
        </div>
      </div>
      <div className="popularSeries">
        {" "}
        {searchInput.length > 2 ? (
          <h1>Search Results </h1>
        ) : (
          <h1>Popular Results </h1>
        )}
      </div>
      <div className="ItemClass">
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          keyBoardControl={true}
          customTransition="all 7 ease in"
          transitionDuration={2000}
          containerClass="carousel-container"
          // removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {popularSeries?.map((shows) => {
            return (
              <Tvshows
                key={shows.id}
                shows={shows}
                selectedSeries={selectedSeries}
                setSelectedSeries={setSelectedSeries}
                playSeries={playSeries}
                watchList={watchList}
                setWatchList={setWatchList}
                burgerActive={burgerActive}
                setBurgerActive={setBurgerActive}
                readMore={readMore}
                setReadMore={setReadMore}
              />
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default Tvshow;
