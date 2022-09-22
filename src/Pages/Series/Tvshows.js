import React, { useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { BsCheck2All } from "react-icons/bs";
import "./Tvshows.css";

const Tvshows = ({
  shows,
  playSeries,
  watchList,
  setWatchList,
  readMore,
  setReadMore,
  burgerActive,
  setBurgerActive,
}) => {
  const imgPath = "https://image.tmdb.org/t/p/w500";
  const [displayButton, setDisplayButton] = useState(false);

  const addToCart = (params) => {
    setWatchList([...watchList, params]);
  };
  return (
    <div className="tvShow">
      {shows.poster_path ? (
        <div onClick={() => playSeries(shows)} className="posterImg">
          <img src={`${imgPath}${shows?.poster_path}`} alt="img Unavailable" />
        </div>
      ) : (
        <div className="noImage">
          <p className="noPoster">No Image </p>
          <p>{shows.original_title}</p>
        </div>
      )}
      <h1>{shows?.original_title} </h1>
      {displayButton ? (
        <div>
          <button
            className="added"
            onClick={() => setDisplayButton(displayButton)}
          >
            Added {<BsCheck2All className="check" />}
          </button>{" "}
        </div>
      ) : (
        <div>
          <button
            onClick={() => {
              addToCart(shows);
              setDisplayButton(!displayButton);
            }}
            className="watchlistBtn"
          >
            Add to watchList {<AiOutlinePlusSquare className="plus" />}
          </button>
        </div>
      )}
      <div className="heroImg"></div>
    </div>
  );
};

export default Tvshows;
