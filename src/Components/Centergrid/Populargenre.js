import React from "react";

const Populargenre = ({ genre, popular }) => {
  const check = popular.genres.map((subGenre) => subGenre.id);

  //I first map over the movie genre then i assign it to a variable check. This shows the movie id
  const comparedGenres = check.includes(genre.id);
  //This checks if the exact movie genre id(check) is included in genre.id which i already mapped over.
  return (
    <div>
      <p>{comparedGenres ? genre.name : ""} </p>
    </div>
  );
};

export default Populargenre;
