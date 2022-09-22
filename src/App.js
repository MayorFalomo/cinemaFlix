import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Homepage from "./Pages/Homepage/Homepage";
import Series from "./Pages/Series/Series";
import Watchlist from "./Pages/Watchlist/Watchlist";
import axios from "axios";
import Errorpage from "./Pages/Errorpage/Errorpage";
import Moviedtails from "./Components/Centergrid/Moviedtails";
import Populardetails from "./Components/Centergrid/Populardetails";
import Upcoming from "./Components/Rightgrid/Upcoming";
import Discovery from "./Pages/Discovery/Discovery";
import Preload from "./Components/Preloadscreen/Preload";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [toggleState, setToggleState] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upComing, setUpcoming] = useState([]);
  const [popular, setPopular] = useState([]);
  const [discover, setDiscover] = useState([]);
  const [selectedTrend, setSelectedTrend] = useState({});
  const [playMovieTrailer, setPlayMovieTrailer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const SearchURL = "https://api.themoviedb.org/3";

  const TopRatedURL =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=543922b15105a918ffe9965a0d904660&language=en-US&page=1";

  const trendingUrl = `https://api.themoviedb.org/3/trending/all/day`;

  const upComingUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=543922b15105a918ffe9965a0d904660&language=en-US&page=1`;

  const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=543922b15105a918ffe9965a0d904660&language=en-US&page=1`;

  const discoverUrl = `https://api.themoviedb.org/3/discover/movie?api_key=543922b15105a918ffe9965a0d904660&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&with_watch_monetization_types=flatrate`;

  // console.log(searchResults);
  useEffect(() => {
    setTimeout(() => {
      setCompleted(true);
    }, 5000);
  }, []);

  const fetchMovies = async (searchInput) => {
    const type = "search";
    const {
      data: { results },
    } = await axios.get(`${SearchURL}/${type}/movie`, {
      params: {
        api_key: "543922b15105a918ffe9965a0d904660",
        query: searchInput,
      },
    });
    // setTopRated(results);
    setSearchResults(results);
  };

  // console.log(searchInput);
  // console.log(searchResults);
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchTrending = async () => {
    const {
      data: { results },
    } = await axios.get(`${trendingUrl}`, {
      params: {
        api_key: "543922b15105a918ffe9965a0d904660",
      },
    });
    setMovies(results);
    await playMovie(results[0]);
  };

  const playTrending = async (id) => {
    const { data } = await axios.get(`${TopRatedURL}/movie/${id}`, {
      params: {
        api_key: "543922b15105a918ffe9965a0d904660",
        append_to_response: "videos",
      },
    });
    return data;
  };

  const playMovie = async (movie) => {
    setPlayMovieTrailer(false);
    const Movietrailer = await playTrending(movie.id);
    setSelectedTrend(Movietrailer);
  };
  useEffect(() => {
    playMovie(movies);
  }, []);

  useEffect(() => {
    fetchTrending();
  }, []);

  useEffect(() => {
    axios
      .get(upComingUrl)
      .then((res) => setUpcoming(res.data.results))
      .catch((err) => console.log(err));
  }, [upComingUrl]);

  useEffect(() => {
    axios
      .get(TopRatedURL)
      .then((res) => setTopRated(res.data.results))
      .catch((err) => console.log(err));
  }, [TopRatedURL]);

  useEffect(() => {
    axios
      .get(popularUrl)
      .then((res) => setPopular(res.data.results))
      .catch((err) => console.log(err));
  }, [popularUrl]);

  useEffect(() => {
    axios
      .get(discoverUrl)
      .then((res) => setDiscover(res.data.results))
      .catch((err) => console.log(err));
  }, [discoverUrl]);

  const temperate = localStorage.getItem("watchList");
  const savedMovie = JSON.parse(temperate);
  const [watchList, setWatchList] = useState(savedMovie || []);
  const [seeMore, setSeeMore] = useState(3);
  const [discoverMore, setDiscoverMore] = useState(5);
  const [menuActive, setMenuActive] = useState(false);
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const [burgerState, setBurgerState] = useState(false);
  const [discoverState, setDiscoverState] = useState(false);

  return (
    <div className="App">
      {!completed ? (
        <div className="contain">
          {!loading ? (
            <div className="loader">
              <div className="vector">
                <Preload />
              </div>
            </div>
          ) : (
            <h1> CINEMAFLIXLOGO </h1>
          )}
        </div>
      ) : (
        <>
          <Routes>
            <Route>
              <Route
                path="/"
                element={
                  <Homepage
                    movies={movies}
                    setMovies={setMovies}
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                    toggleState={toggleState}
                    setToggleState={setToggleState}
                    searchResults={searchResults}
                    setSearchResults={setSearchResults}
                    topRated={topRated}
                    setTopRated={setTopRated}
                    upComing={upComing}
                    setUpcoming={setUpcoming}
                    popular={popular}
                    setPopular={setPopular}
                    selectedTrend={selectedTrend}
                    setSelectedTrend={setSelectedTrend}
                    playMovieTrailer={playMovieTrailer}
                    setPlayMovieTrailer={setPlayMovieTrailer}
                    fetchMovies={fetchMovies}
                    watchList={watchList}
                    setWatchList={setWatchList}
                    playMovie={playMovie}
                    seeMore={seeMore}
                    setSeeMore={setSeeMore}
                    menuActive={menuActive}
                    setMenuActive={setMenuActive}
                    hamburgerMenu={hamburgerMenu}
                    setHamburgerMenu={setHamburgerMenu}
                  />
                }
              />
              <Route
                path="/series"
                element={
                  <Series watchList={watchList} setWatchList={setWatchList} />
                }
              />
              <Route
                path="/watchlist"
                element={
                  <Watchlist
                    watchList={watchList}
                    setWatchList={setWatchList}
                    topRated={topRated}
                    setTopRated={setTopRated}
                    burgerState={burgerState}
                    setBurgerState={setBurgerState}
                  />
                }
              />
            </Route>
            <Route
              path="/discover"
              element={
                <Discovery
                  watchList={watchList}
                  setWatchList={setWatchList}
                  discover={discover}
                  setDiscover={setDiscover}
                  discoverMore={discoverMore}
                  setDiscoverMore={setDiscoverMore}
                  discoverState={discoverState}
                  setDiscoverState={setDiscoverState}
                />
              }
            />
            <Route
              path="/upcoming"
              element={
                <Upcoming
                  upComing={upComing}
                  setUpcoming={setUpcoming}
                  watchList={watchList}
                  seeMore={seeMore}
                  setSeeMore={setSeeMore}
                  hamburgerMenu={hamburgerMenu}
                  setHamburgerMenu={setHamburgerMenu}
                  menuActive={menuActive}
                  setMenuActive={setMenuActive}
                  burgerState={burgerState}
                  setBurgerState={setBurgerState}
                />
              }
            />
            <Route
              path="/moviedetails/:id"
              element={
                <Moviedtails
                  watchList={watchList}
                  burgerState={burgerState}
                  setBurgerState={setBurgerState}
                  discoverState={discoverState}
                  setDiscoverState={setDiscoverState}
                />
              }
            >
              {" "}
            </Route>
            <Route
              path="/populardetails/:id"
              element={
                <Populardetails
                  watchList={watchList}
                  burgerState={burgerState}
                  setBurgerState={setBurgerState}
                />
              }
            ></Route>
            <Route path="*" element={<Errorpage />}>
              {" "}
            </Route>
          </Routes>
        </>
      )}
    </div>
  );
}
// return { content };

export default App;
