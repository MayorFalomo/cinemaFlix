import React from "react";

const Genre = ({ genre, movie }) => {
  console.log(genre.id, "Actual genre id");
  //   console.log(movie.genres, "movie object");

  const check = movie.genres.map((subGenre) => subGenre.id);
  //I first map over the movie genre then i assign it to a variable check. This shows the movie id
  console.log(check);
  const comparedGenres = check.includes(genre.id);
  //This checks if the exact movie genre id(check) is included in genre.id which i already mapped over.

  return (
    <div className="genreContainer">
      <div className="tags">
        <p>{comparedGenres ? genre?.name : ""}</p>
      </div>
    </div>
  );
};

export default Genre;
