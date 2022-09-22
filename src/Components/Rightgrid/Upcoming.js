import React, { useEffect, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import Navbarcoming from "./Navbarcoming";
import Newmovies from "./Newmovies";
import ReactLoading from "react-loading";

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
}) => {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCompleted(true);
    }, 2000);
  }, []);

  return (
    <div className="main-Container">
      {!completed ? (
        <div className="contain">
          {!loading ? (
            <div className="loader">
              <ReactLoading type="spin" color="#fff" height={100} width={100} />
            </div>
          ) : (
            <h1>Loading</h1>
          )}
        </div>
      ) : (
        <>
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
                      burgerState ? "hamburgerLinksX" : "hamMenuActiveX"
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
                    <Newmovies upComing={upComing} setUpComing={setUpComing} />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Upcoming;
