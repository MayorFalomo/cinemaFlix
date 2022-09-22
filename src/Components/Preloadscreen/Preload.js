import React from "react";
import Logo from "../Navbar/greenxLogo.svg";
import "../Preloadscreen/Preload.css";

const Preload = () => {
  return (
    <div className="preloadLogo">
      <img src={Logo} alt="img" />{" "}
    </div>
  );
};

export default Preload;
