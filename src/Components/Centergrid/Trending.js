import React from "react";
import { useState, useEffect } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { BsCheck2All } from "react-icons/bs";
import YouTube from "react-youtube";
// import Watchlist from "../../Pages/Watchlist/Watchlist";
import Trendgenre from "./Trendgenre";
import "./Trending.css";

const Trending = ({
  movie,
  selectedTrend,
  setSelectedTrend,
  playMovieTrailer,
  setPlayMovieTrailer,
  playMovie,
  watchList,
  setWatchList,
  genres,
  playTrendingMovieTrailer,
}) => {
  const imagePath = "https://image.tmdb.org/t/p/w500";
  const imgPath = "https://image.tmdb.org/t/p/w1280";

  const [seeMore, setSeeMore] = useState(false);
  const [displayButton, setDisplayButton] = useState(false);
  const [trailerKey, setTrailerKey] = useState();

  const addToCart = (param) => {
    setWatchList([param, ...watchList]);
  };

  //SelectedTrend state is an array that stores the videos array for trailer
  useEffect(() => {
    if (selectedTrend?.videos) {
      const trailer = selectedTrend?.videos?.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailerKey(trailer?.key);
    }
  }, [selectedTrend]);

  // console.log(movie.id, "movieid");

  return (
    <div className="ratedContainer">
      <div
        id="bgClass"
        style={{
          borderRadius: "50px",
          backgroundImage: `url(${imgPath}${movie?.backdrop_path}`,
        }}
      >
        <div id="bgoverlay"></div>
        <div id="movieDetails">
          <div id="bgImage">
            <img src={`${imagePath}${movie?.poster_path} `} alt="img" />
          </div>
          <div className="flexText">
            <h2>{movie?.name} </h2>
            <h2>{movie?.title} </h2>
            <h5>
              {movie?.release_date} | {movie?.adult ? "PG-18" : "PG-13"} |{" "}
              <span className="span">
                {genres.map((genre, index) => (
                  <div key={index}>
                    <Trendgenre genre={genre} movie={movie} />
                  </div>
                ))}
              </span>
            </h5>
            {seeMore ? (
              <p>{movie?.overview}</p>
            ) : (
              <p>{movie?.overview.slice(0, 100)}.... </p>
            )}
            <p className="SeeMore" onClick={() => setSeeMore(!seeMore)}>
              {seeMore ? "See Less" : "See More"}{" "}
            </p>

            <div className="CartBtn">
              {trailerKey && setPlayMovieTrailer ? (
                <YouTube
                  videoId={trailerKey}
                  className="youtube-movie"
                  opts={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              ) : (
                ""
              )}

              {playMovieTrailer ? (
                <button
                  className="TrailerBtn"
                  onClick={() => {
                    setPlayMovieTrailer(false);
                    setTrailerKey("");
                  }}
                >
                  Close Trailer{" "}
                </button>
              ) : (
                <button
                  className="TrailerBtn"
                  onClick={() => {
                    console.log(movie.id);
                    playTrendingMovieTrailer(movie.id);
                    setPlayMovieTrailer(true);
                  }}
                >
                  Play Trailer{" "}
                </button>
              )}
              {displayButton ? (
                <div className="watchlistButtons">
                  <button
                    className="addedRated"
                    onClick={() => setDisplayButton(displayButton)}
                  >
                    Added {<BsCheck2All className="check" />}
                  </button>{" "}
                </div>
              ) : (
                <div className="addedBtns">
                  <button
                    className="watchBtns"
                    onClick={() => {
                      addToCart(movie);
                      setDisplayButton(!displayButton);
                    }}
                  >
                    Add to Watchlist {<AiOutlinePlusSquare className="plus" />}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;
