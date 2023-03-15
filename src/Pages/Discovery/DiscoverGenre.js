import React from "react";

const DiscoverGenre = ({ genre, discover }) => {
  const check = discover.genre_ids.map((subGenre) => subGenre);

  const comparedGenres = check.includes(genre.id);

  return (
    <div>
      <p>{comparedGenres ? genre.name : ""}</p>
    </div>
  );
};

export default DiscoverGenre;
