import React from "react";

const Genres = ({ genre, popularSeries, pop }) => {
  //   console.log(pop?.genre_ids);
  //   console.log(genre?.id, "genreId");
  //   console.log(genre?.name, "genreId");

  const check = pop?.genre_ids.map((subGenre) => subGenre);
  const compareGenres = check?.includes(genre?.id);
  //   console.log(compareGenres);
  return (
    <div>
      <div className="genre">
        <p>{compareGenres ? genre?.name : ""} </p>
      </div>
    </div>
  );
};

export default Genres;
