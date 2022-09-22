import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import "./Series.css";
import Tvshow from "./Tvshow";
import ReactLoading from "react-loading";

const Series = ({ watchList, setWatchList }) => {
  const [searchInput, setSearchInput] = useState(" ");
  const [popularSeries, setPopularSeries] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState({});
  const [playSeriesTrailer, setPlaySeriesTrailer] = useState(false);
  const [burgerActive, setBurgerActive] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCompleted(true);
    }, 1000);
  }, []);

  const API_URL = "https://api.themoviedb.org/3";

  const fetchSeries = async (searchInput) => {
    const type = searchInput ? "search/tv" : "tv/popular";
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}`, {
      params: {
        api_key: "543922b15105a918ffe9965a0d904660",
        query: searchInput,
      },
    });

    await playSeries(results[0]);
    setPopularSeries(results);
  };

  const fetchShow = async (id) => {
    const { data } = await axios.get(`${API_URL}/tv/${id}`, {
      params: {
        api_key: "543922b15105a918ffe9965a0d904660",
        append_to_response: "videos",
      },
    });
    return data;
  };

  const playSeries = async (tv) => {
    setPlaySeriesTrailer(false); //close the youtube component when you click on another movie
    const Tvseries = await fetchShow(tv.id);
    setSelectedSeries(Tvseries);
  };

  useEffect(() => {
    fetchSeries();
  }, []);

  return (
    <div className="SeriesContainer">
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
          <Navbar
            watchList={watchList}
            burgerActive={burgerActive}
            setBurgerActive={setBurgerActive}
            readMore={readMore}
            setReadMore={setReadMore}
          />
          <Tvshow
            popularSeries={popularSeries}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            selectedSeries={selectedSeries}
            setSelectedSeries={setSelectedSeries}
            fetchSeries={fetchSeries}
            playSeries={playSeries}
            playSeriesTrailer={playSeriesTrailer}
            setPlaySeriesTrailer={setPlaySeriesTrailer}
            watchList={watchList}
            setWatchList={setWatchList}
            burgerActive={burgerActive}
            setBurgerActive={setBurgerActive}
            readMore={readMore}
            setReadMore={setReadMore}
          />
        </>
      )}
    </div>
  );
};

export default Series;
