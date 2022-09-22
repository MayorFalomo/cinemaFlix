import React from "react";
import { useState } from "react";
import YouTube from "react-youtube";
import "./Trending.css";
// import 'react-slideshow-image/dist/styles.css';
// import AwesomeSlider from 'react-awesome-slider';
// import 'react-awesome-slider/dist/styles.css'

const Trending = ({
  movie,
  selectedTrend,
  playMovieTrailer,
  setPlayMovieTrailer,
  playMovie,
}) => {
  const imagePath = "https://image.tmdb.org/t/p/w500";
  const imgPath = "https://image.tmdb.org/t/p/w1280";

  const [seeMore, setSeeMore] = useState(false);

  const playTrailer = () => {
    const trailer = selectedTrend.videos.results.find(
      (vid) => vid.name === "Official Trailer"
    );
    return (
      <YouTube
        videoId={trailer.key}
        className="youtube-movie"
        opts={{
          width: "100%",
          height: "100%",
        }}
      />
    );
  };

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
              {movie?.release_date} | {movie?.adult ? "PG-18" : "PG-13"}{" "}
            </h5>
            {seeMore ? (
              <p>{movie?.overview}</p>
            ) : (
              <p>{movie?.overview.slice(0, 100)}.... </p>
            )}
            <p className="SeeMore" onClick={() => setSeeMore(!seeMore)}>
              {seeMore ? "See Less" : "See More"}{" "}
            </p>
            {selectedTrend?.videos && playMovieTrailer && playMovie(movie)
              ? playTrailer()
              : " "}
            {playMovieTrailer ? (
              <button
                className="TrailerBtn"
                onClick={() => {
                  setPlayMovieTrailer(false);
                }}
              >
                Close Trailer{" "}
              </button>
            ) : (
              <button
                className="TrailerBtn"
                onClick={() => setPlayMovieTrailer(true)}
              >
                Play Trailer{" "}
              </button>
            )}
            <button className="watchBtn">Watch Movie </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;
