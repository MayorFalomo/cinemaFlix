import React from "react";

const NewGenre = ({ genre, upComing }) => {
  const check = upComing.genre_ids.map((subGenre) => subGenre);

  const comparedGenres = check.includes(genre.id);
  return (
    <div>
      <p>{comparedGenres ? genre.name : ""} </p>
    </div>
  );
};

export default NewGenre;
