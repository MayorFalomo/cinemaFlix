import React, { useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { BsCheck2All } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Rated = ({ top, watchList, setWatchList }) => {
  const imgPath = "https://image.tmdb.org/t/p/w500";

  const [displayButton, setDisplayButton] = useState(false);

  const addToCart = (param) => {
    setWatchList([...watchList, param]);
  };

  const navigate = useNavigate();

  return (
    <div className="RatedCard">
      {top.poster_path ? (
        <div
          onClick={() => navigate(`/moviedetails/${top.id}`)}
          id="ratedImage"
        >
          <img src={`${imgPath}${top?.poster_path} `} alt="img" />
        </div>
      ) : (
        <div className="noImagery">
          <p className="noPosters">No Image </p>
          <p>{top.original_title}</p>
        </div>
      )}
      {displayButton ? (
        <div className="watchlistBtns">
          <button
            className="addRated"
            onClick={() => setDisplayButton(displayButton)}
          >
            Added {<BsCheck2All className="check" />}
          </button>{" "}
        </div>
      ) : (
        <div className="ratedBtn">
          <button
            onClick={() => {
              addToCart(top);
              setDisplayButton(!displayButton);
            }}
          >
            Add to Watchlist {<AiOutlinePlusSquare className="plus" />}
          </button>
        </div>
      )}
    </div>
  );
};

export default Rated;
