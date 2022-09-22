import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Famous.css";
import { BsCheck2All } from "react-icons/bs";
import { AiOutlinePlusSquare } from "react-icons/ai";

const Famous = ({ famous, watchList, setWatchList }) => {
  const imgPath = "https://image.tmdb.org/t/p/w500";

  const [displayAdded, setDisplayAdded] = useState(false);

  const addToCart = (param) => {
    setWatchList([...watchList, param]);
  };

  const navigation = useNavigate();
  return (
    <div className="famous">
      <div
        onClick={() => navigation(`/populardetails/${famous.id}`)}
        className="famousImg"
      >
        <img src={`${imgPath}${famous?.poster_path}`} alt="img" />
      </div>
      {displayAdded ? (
        <div className="famousBtn">
          <button
            onClick={() => setDisplayAdded(displayAdded)}
            className="addedBtn"
          >
            Added {<BsCheck2All className="check" />}{" "}
          </button>
        </div>
      ) : (
        <div className="famousBtn">
          <button
            onClick={() => {
              addToCart(famous);
              setDisplayAdded(!displayAdded);
            }}
            className="addToBtn"
          >
            Add to Watchlist {<AiOutlinePlusSquare className="plus" />}
          </button>
        </div>
      )}
    </div>
  );
};

export default Famous;
