import React, { useState } from "react";
import "./Newmovies.css";

const Newmovies = ({ upComing, setUpComing }) => {
  const imgPath = "https://image.tmdb.org/t/p/w500";

  const [seeMore, setSeeMore] = useState(false);
  return (
    <div className="newContainer">
      <div className="comingCard">
        <div className="newImg">
          <img src={`${imgPath}${upComing?.backdrop_path}`} alt="img" />
        </div>
        <div className="newText">
          <p> Release Date: {upComing?.release_date} </p>
          <h2>{upComing?.original_title} </h2>
          {seeMore ? (
            <p className="seeMoreText">{upComing?.overview}</p>
          ) : (
            <p className="seeLessText">
              {upComing?.overview.slice(0, 100)}....{" "}
            </p>
          )}
          {
            <p className="SeeMore" onClick={() => setSeeMore(!seeMore)}>
              {seeMore ? "See Less" : "See More"}{" "}
            </p>
          }
        </div>
      </div>
      {/* <button className="newBtn">Add to Watchlist</button> */}
    </div>
  );
};

export default Newmovies;
