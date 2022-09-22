import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";

const Results = ({ search }) => {
  const imgPath = "https://image.tmdb.org/t/p/w500";

  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCompleted(true);
    }, 2000);
  }, []);
  return (
    <div className="searchResult">
      {!completed ? (
        <div className="contain">
          {!loading ? (
            <div className="loader">
              <ReactLoading type="spin" color="#fff" width={100} height={100} />
            </div>
          ) : (
            <h1>Loading</h1>
          )}
        </div>
      ) : (
        <>
          {search.poster_path ? (
            <div className="posterImg">
              <img
                src={`${imgPath}${search?.poster_path}`}
                alt="img Unavailable"
              />
              <div className="searchText">
                <p>{search.original_title} </p>
                <p>
                  <span>Overview:</span> {search.overview}{" "}
                </p>
              </div>
            </div>
          ) : (
            <div className="noImage">
              <p className="noPoster">No Image </p>
              <p>{search.original_title}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Results;
