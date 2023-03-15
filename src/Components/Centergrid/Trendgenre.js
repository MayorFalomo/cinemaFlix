import React from "react";

const Trendgenre = ({ genre, movie }) => {
  const check = movie.genre_ids.map((subGenre) => subGenre);
  // console.log(check, "Check");
  //I first map over the movie genre then i assign it to a variable check. This shows the movie id
  const comparedGenres = check.includes(genre.id);
  //This checks if the exact movie genre id(check) is included in genre.id which i already mapped over.
  return (
    <div>
      <p>{comparedGenres ? genre.name : ""} </p>
    </div>
  );
};

export default Trendgenre;
