import React, { useState } from "react";

const Coming = ({ coming }) => {
  const imgPath = "https://image.tmdb.org/t/p/w500";

  const [seeMoreText, setSeeMoreText] = useState(false);

  return (
    <div className="comingCard">
      <div className="comingFlex">
        <div className="comingImg">
          <img src={`${imgPath}${coming?.backdrop_path}`} alt="img" />
        </div>
        <p>Release Date: {coming?.release_date} </p>
        <div className="aboutMovie">
          {seeMoreText ? (
            <p>{coming?.overview} </p>
          ) : (
            <p onClick={() => setSeeMoreText(!seeMoreText)}>
              {coming?.overview?.slice(0, 100)}...
            </p>
          )}
          <p className="SeeMore" onClick={() => setSeeMoreText(!seeMoreText)}>
            {seeMoreText ? "See Less" : "See More "}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Coming;
