import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import "./Series.css";
import Tvshow from "./Tvshow";
import ReactLoading from "react-loading";

const Series = ({ watchList, setWatchList, genres }) => {
  const [searchInput, setSearchInput] = useState(" ");
  const [popularSeries, setPopularSeries] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState({});
  const [playSeriesTrailer, setPlaySeriesTrailer] = useState(false);
  const [burgerActive, setBurgerActive] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setCompleted(true);
  //   }, 1000);
  // }, []);

  const API_URL = "https://api.themoviedb.org/3";

  // Api call for querying for Series
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
    setCompleted(true);
    await playSeries(results[0]); //For showing the first poster
    setPopularSeries(results);
  };

  // Api call to query the movie and video trailer
  const fetchShow = async (id) => {
    const { data } = await axios.get(`${API_URL}/tv/${id}`, {
      params: {
        api_key: "543922b15105a918ffe9965a0d904660",
        append_to_response: "videos",
      },
    });
    return data;
  };

  //Adding the id for the trailer
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
        <div className="loaderCon">
          <span class="loader"></span>
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
            genres={genres}
          />
        </>
      )}
    </div>
  );
};

export default Series;
