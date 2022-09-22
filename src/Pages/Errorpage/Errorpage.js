import React from "react";
import { Link } from "react-router-dom";
import "./Errorpage.css";

const Errorpage = () => {
  return (
    <div className="ErrorCard">
      You've entered a Broken Link{" "}
      <Link to="/">
        <p> Go Home </p>{" "}
      </Link>
    </div>
  );
};

export default Errorpage;
