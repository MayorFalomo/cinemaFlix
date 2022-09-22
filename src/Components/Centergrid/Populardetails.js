import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import "../Centergrid/Populardetails.css";
import { useParams } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import Navbarcoming from "../Rightgrid/Navbarcoming";
import ReactLoading from "react-loading";

const Populardetails = ({ watchList, burgerState, setBurgerState }) => {
  const id = useParams().id;
  const [popular, setPopular] = useState({});
  const [seeMore, setSeeMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCompleted(true);
    }, 2000);
  });
  const imgPath = "https://image.tmdb.org/t/p/w500";
  const backPath = "https://image.tmdb.org/t/p/original";

  const getPopular = async () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=543922b15105a918ffe9965a0d904660&append_to_response=videos,images`
      )
      .then((res) => setPopular(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPopular();
  }, []);

  return (
    <div className="detailsContainer">
      {!completed ? (
        <div className="contain">
          {!loading ? (
            <div className="loader">
              <ReactLoading type="spin" color="#fff" height={100} width={100} />
            </div>
          ) : (
            <h1>Loading </h1>
          )}
        </div>
      ) : (
        <>
          <Navbarcoming
            watchList={watchList}
            burgerState={burgerState}
            setBurgerState={setBurgerState}
          />
          <div
            style={{
              backgroundImage: `url(${backPath}${popular.backdrop_path}) `,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            className="detailsCard"
          >
            <div className="bg-color"></div>

            <div className="detail">
              {burgerState ? (
                <div
                  className={burgerState ? "hamburgerLinksX" : "hamMenuActiveX"}
                  onClick={() => setBurgerState(!burgerState)}
                >
                  <p>{<FaTimes className="burgerMenuHam" />}</p>
                </div>
              ) : (
                <div
                  className={burgerState ? "hamMenuActive" : "hamburgerLinking"}
                  onClick={() => setBurgerState(!burgerState)}
                >
                  <p>{<BiMenuAltRight className="burgerMenuHam" />} </p>
                </div>
              )}
              <div className="posterDetail">
                {" "}
                <img src={`${imgPath}${popular.poster_path} `} alt="img" />
              </div>
              <div className="flexItemClass">
                <h1>
                  <span> Title:</span> {popular?.original_title}{" "}
                </h1>
                <p>
                  <span> Runtime:</span> {popular?.runtime}minutes{" "}
                </p>
                <p>
                  <span> Language:</span> {popular.original_language}{" "}
                </p>
                <p>
                  <span> Popularity: </span> {popular?.popularity}{" "}
                </p>
                <p>
                  <span> Release Date:</span> {popular?.release_date}{" "}
                </p>
                <p>
                  <span> Budget: </span> ${popular?.budget}{" "}
                </p>
                <p>
                  <span> Revenue:</span> ${popular?.revenue}{" "}
                </p>
                <p>
                  <span> Tagline:</span> {popular?.tagline}{" "}
                </p>
                {seeMore ? (
                  <p>Overview: {popular?.overview} </p>
                ) : (
                  <p onClick={() => setSeeMore(!seeMore)}>
                    <span>Overview:</span>
                    {popular?.overview?.slice(0, 100)}...
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Populardetails;
