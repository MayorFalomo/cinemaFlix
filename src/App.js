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
  const [selectedTrend, setSelectedTrend] = useState();
  const [playMovieTrailer, setPlayMovieTrailer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [genres, setGenres] = useState([]);
  const SearchURL = "https://api.themoviedb.org/3";

  const TopRatedURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;

  const trendingUrl = `https://api.themoviedb.org/3/trending/all/day`;

  const upComingUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;

  const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;

  const discoverUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&with_watch_monetization_types=flatrate`;

  const genre = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;

  // console.log(searchResults);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setCompleted(true);
  //   }, 3000);
  // }, []);

  //Api call for searching for movies
  const fetchMovies = async (searchInput) => {
    const type = "search";
    const {
      data: { results },
    } = await axios.get(`${SearchURL}/${type}/movie`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        query: searchInput,
      },
    });
    setSearchResults(results);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  //* So it shows the first movie for trending
  const fetchTrending = async () => {
    const {
      data: { results },
    } = await axios.get(`${trendingUrl}`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        append_to_response: "videos",
      },
    });
    setMovies(results);
    setCompleted(true);
    console.log(results[0], "results");
    // await  playTrendingMovieTrailer(results[0])
    // console.log(results[0], "results");
    await playMovie(results[0]);
  };

  //Function that gets the id, then takes that id and searches then it responds with the movie video trailer
  const playTrendingMovieTrailer = async (id) => {
    try {
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };
      await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`,
        options
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res, "result");
          setSelectedTrend(res);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err, "error");
    }
  };

  console.log(movies[0], "movies square");

  useEffect(() => {
    if (playMovieTrailer) {
      playTrendingMovieTrailer(movies[0].id);
    }
  }, []);
  //Function To get the id of the movie for trailer...Not implemented yet though
  const playMovie = async (movie) => {
    setPlayMovieTrailer(false);
    const Movietrailer = await playTrending(movie.id);
    console.log(Movietrailer, "movie Trailer");
    // setSelectedTrend(Movietrailer);
  };

  // Api call for Trending movies and query to watch Trailer
  const playTrending = async (id) => {
    const { data } = await axios.get(`${TopRatedURL}/movie/${id}`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        append_to_response: "videos",
      },
    });
    // console.log(data, "This is data ");
    return data;
  };

  useEffect(() => {
    playMovie(movies);
  }, []);

  useEffect(() => {
    fetchTrending();
  }, []);

  // Upcoming Movies Api Call
  useEffect(() => {
    axios
      .get(upComingUrl)
      .then((res) => setUpcoming(res.data.results))
      .catch((err) => console.log(err));
  }, [upComingUrl]);

  useEffect(() => {
    axios
      .get(genre)
      .then((res) => setGenres(res.data.genres))
      .catch((err) => {
        console.log(err);
      });
  }, [genre]);

  //Toprated Movies Api call
  useEffect(() => {
    axios
      .get(TopRatedURL)
      .then((res) => setTopRated(res.data.results))
      .catch((err) => console.log(err));
  }, [TopRatedURL]);

  //Popular Movies Api Call
  useEffect(() => {
    axios
      .get(popularUrl)
      .then((res) => setPopular(res.data.results))
      .catch((err) => console.log(err));
  }, [popularUrl]);

  //Discover Movies Api Call
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

  // console.log(watchList, "watchList");
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
        <div>
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
                    // playMovie={playMovie}
                    seeMore={seeMore}
                    setSeeMore={setSeeMore}
                    menuActive={menuActive}
                    setMenuActive={setMenuActive}
                    hamburgerMenu={hamburgerMenu}
                    setHamburgerMenu={setHamburgerMenu}
                    genres={genres}
                    setGenres={setGenres}
                    playTrendingMovieTrailer={playTrendingMovieTrailer}
                  />
                }
              />
              <Route
                path="/series"
                element={
                  <Series
                    watchList={watchList}
                    setWatchList={setWatchList}
                    genres={genres}
                    setGenres={setGenres}
                  />
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
                  genres={genres}
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
                  genres={genres}
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
                  genres={genres}
                  setGenres={setGenres}
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
                  discoverState={discoverState}
                  setDiscoverState={setDiscoverState}
                  genres={genres}
                />
              }
            ></Route>
            <Route path="*" element={<Errorpage />}>
              {" "}
            </Route>
          </Routes>
        </div>
      )}
    </div>
  );
}
// return { content };

export default App;
