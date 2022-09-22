import React from "react";
import "./Seenmovie.css";

const Seenmovies = ({
  seenMovie,
  watchList,
  clearWatchList,
  removeMovieBtn,
}) => {
  const imgPath = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="seenContainer">
      <div className="flex-Seen-List">
        <div className="seenImg">
          <img src={`${imgPath}${seenMovie.poster_path}`} alt="img" />
        </div>
        <p>{seenMovie.original_title} </p>
        <button onClick={() => removeMovieBtn(seenMovie.id)}>Remove </button>
      </div>
    </div>
  );
};

export default Seenmovies;
