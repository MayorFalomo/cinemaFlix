import React, { useEffect, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import Navbarcoming from "./Navbarcoming";
import Newmovies from "./Newmovies";
import ReactLoading from "react-loading";
import "./Newmovies.css";
const Upcoming = ({
  upComing,
  setUpComing,
  watchList,
  setSeeMore,
  hamburgerMenu,
  setHamburgerMenu,
  menuActive,
  setMenuActive,
  burgerState,
  setBurgerState,
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
    <div className="main-Container">
      {!completed ? (
        <div className="contain">
          {!loading ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100vw",
              }}
            >
              <span class="loader"></span>
            </div>
          ) : (
            <h1>Loading</h1>
          )}
        </div>
      ) : (
        <div>
          <Navbarcoming
            watchList={watchList}
            upComing={upComing}
            burgerState={burgerState}
            setBurgerState={setBurgerState}
            menuActive={menuActive}
            setMenuActive={setMenuActive}
          />
          <div className="comingSect">
            <div className="burgerHeader">
              <div className="pageHeader">
                <h1>Upcoming Movies </h1>
              </div>
              <div className="BurgerSect">
                {burgerState ? (
                  <div
                    className={
                      burgerState ? "hamburgerLinksXs" : "hamMenuActiveX"
                    }
                    onClick={() => setBurgerState(!burgerState)}
                  >
                    <p>{<FaTimes className="burgerMenuHam" />}</p>
                  </div>
                ) : (
                  <div
                    className={
                      burgerState ? "hamMenuActive" : "hamburgerLinking"
                    }
                    onClick={() => setBurgerState(!burgerState)}
                  >
                    <p>{<BiMenuAltRight className="burgerMenuHam" />} </p>
                  </div>
                )}
              </div>
            </div>
            <div className="comingSection">
              {upComing.map((upComing) => {
                return (
                  <div className="map-Container" key={upComing.id}>
                    <Newmovies
                      upComing={upComing}
                      setUpComing={setUpComing}
                      genres={genres}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upcoming;
