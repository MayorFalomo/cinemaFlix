import React, { useState } from "react";

const Discovermovies = ({ discover }) => {
  const imgPath = "https://image.tmdb.org/t/p/w500";

  const [seeMore, setSeeMore] = useState(false);
  return (
    <div className="DiscoverCard">
      <div className="discoverPathImg">
        {console.log(discover)}
        <img src={`${imgPath}${discover?.poster_path} `} alt="img" />
      </div>
      <p>{discover?.original_title} </p>
      {seeMore ? (
        <p>{discover?.overview}</p>
      ) : (
        <p>{discover?.overview.slice(0, 100)} .... </p>
      )}
      {
        <p className="SeeMore" onClick={() => setSeeMore(!seeMore)}>
          {seeMore ? "See Less" : "See More"}{" "}
        </p>
      }
    </div>
  );
};

export default Discovermovies;
