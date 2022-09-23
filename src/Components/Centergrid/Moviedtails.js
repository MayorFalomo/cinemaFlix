import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../Centergrid/Moviedetails.css";
import { FaTimes } from "react-icons/fa";
import { BiMenuAltRight } from "react-icons/bi";
import ReactLoading from "react-loading";
import Navbarcoming from "../Rightgrid/Navbarcoming";
import DiscoverNav from "../../Pages/Discovery/DiscoverNav";
import { Link } from "react-router-dom";

const Moviedtails = ({
  watchList,
  burgerState,
  setBurgerState,
  discoverState,
  setDiscoverState,
}) => {
  const id = useParams().id;

  const imgPath = "https://image.tmdb.org/t/p/w500";
  const backPath = "https://image.tmdb.org/t/p/original";

  const [movie, setMovie] = useState({});
  const [seeMoreText, setSeeMoreText] = useState(false);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCompleted(true);
    }, 2000);
  }, []);

  const getDetails = async () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=543922b15105a918ffe9965a0d904660&append_to_response=videos,images`
      )
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div className="detailsContainer">
      {!completed ? (
        <div className="contain">
          {!loading ? (
            <div className="loader">
              <ReactLoading type="spin" color="#fff" width={100} height={100} />{" "}
            </div>
          ) : (
            <h1>Loading</h1>
          )}{" "}
        </div>
      ) : (
        <>
          <DiscoverNav
            watchList={watchList}
            burgerState={burgerState}
            setBurgerState={setBurgerState}
            discoverState={discoverState}
            setDiscoverState={setDiscoverState}
          />
          <ul className={discoverState ? "navMenuLinks " : "navLinks"}>
            <Link to="/">
              <li>Home </li>
            </Link>
            <Link to="/series">
              <li>Series </li>
            </Link>
            <Link to="/discover">
              <li>Discover </li>{" "}
            </Link>
          </ul>

          <div
            style={{
              backgroundImage: `url(${backPath}${movie.backdrop_path}) `,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              minHeight: "100vh",
            }}
            className="detailsCard"
          >
            <div className="bg-color"></div>
            <div className="detail">
              {discoverState ? (
                <div
                  onClick={() => setDiscoverState(!discoverState)}
                  className={discoverState ? "hamBurgerD" : "hamburgerActiveD"}
                >
                  <p>{<FaTimes className="DiscoverMenu" />} </p>{" "}
                </div>
              ) : (
                <div
                  onClick={() => setDiscoverState(!discoverState)}
                  className={discoverState ? "burgerActiveD" : "burgerD"}
                >
                  <p>{<BiMenuAltRight className="DiscoverMenu" />} </p>
                </div>
              )}
              <div className="posterDetail">
                {" "}
                <img src={`${imgPath}${movie.poster_path} `} alt="img" />
              </div>
              <div className="flexDetails">
                <h2>
                  <span>Title:</span> {movie?.original_title}{" "}
                </h2>
                <p>
                  <span>Runtime:</span> {movie?.runtime}minutes
                </p>
                <p>
                  <span>Language:</span> {movie.original_language}{" "}
                </p>
                <p>
                  <span> Popularity:</span> {movie?.popularity}{" "}
                </p>
                <p>
                  <span> Release Date:</span> {movie?.release_date}{" "}
                </p>
                <p>
                  <span> Budget: </span> ${movie?.budget}{" "}
                </p>
                <p>
                  <span> Revenue: </span> ${movie?.revenue}{" "}
                </p>
                <p>
                  <span> Tagline:</span> {movie?.tagline}{" "}
                </p>
                {seeMoreText ? (
                  <p>Overview: {movie?.overview} </p>
                ) : (
                  <p onClick={() => setSeeMoreText(!seeMoreText)}>
                    {" "}
                    <span> Overview:</span>
                    {movie?.overview?.slice(0, 100)}...
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

export default Moviedtails;
