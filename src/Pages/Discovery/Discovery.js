import React, { useEffect, useState } from "react";
import "./Discover.css";
import Discovermovies from "./Discovermovies";
import DiscoverNav from "./DiscoverNav";
import { FaTimes } from "react-icons/fa";
import { BiMenuAltRight } from "react-icons/bi";
import { Link } from "react-router-dom";

const Discovery = ({
  watchList,
  setWatchList,
  discover,
  setDiscover,
  discoverMore,
  setDiscoverMore,
  discoverState,
  setDiscoverState,
  genres,
}) => {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCompleted(true);
    }, 1000);
  }, []);

  return (
    <div className="discoverContainer">
      {!completed ? (
        <div className="contain">
          <span className="loader"></span>
        </div>
      ) : (
        <>
          <DiscoverNav
            watchList={watchList}
            setWatchList={setWatchList}
            discover={setDiscover}
            discoverState={discoverState}
          />
          <div className="discoverMoreFlex">
            <div className="discoverHeading">
              <h1>Discover More Movies </h1>

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
            </div>
            <div className="discoverFlexItems">
              {discover.slice(0, discoverMore).map((discover) => {
                return (
                  <div key={discover.id} className="discoverFlex">
                    <Discovermovies discover={discover} genres={genres} />
                  </div>
                );
              })}
            </div>
            <div className="testSee">
              <button
                className={discoverMore === 5 ? "more active" : "more"}
                onClick={() => setDiscoverMore(10)}
              >
                See More
              </button>
              <button
                className={discoverMore === 10 ? "more active" : "more"}
                onClick={() => setDiscoverMore(15)}
              >
                See More
              </button>
              <button
                className={discoverMore === 15 ? "more active" : "more"}
                onClick={() => setDiscoverMore(20)}
              >
                See More
              </button>
              <button
                className={discoverMore === 20 ? "more active" : "more"}
                onClick={() => setDiscoverMore(5)}
              >
                See Less
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Discovery;
