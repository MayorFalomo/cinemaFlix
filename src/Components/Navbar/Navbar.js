import React from "react";
import { BiHomeCircle, BiTime } from "react-icons/bi";
import { AiOutlineCompass } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineCloud } from "react-icons/ai";
import { MdOutlineAddBox } from "react-icons/md";
import { BiExit } from "react-icons/bi";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../Navbar/greenxLogo.svg";
import userImg from "../Navbar/resize.jpg";
import { CgProfile } from "react-icons/cg";

const Navbar = ({ watchList, hamburgerMenu }) => {
  return (
    <nav>
      <div className={hamburgerMenu ? "navbar active" : "navbarHeader"}>
        <div
          className={
            hamburgerMenu
              ? "clinks active"
              : "clinks" || hamburgerMenu
              ? "itemClass.active"
              : "itemClass"
          }
        >
          <div className="NavLogoImg">
            <img src={logo} alt="img" />
          </div>
          <div className="flexCard">
            <p className="MENU">MENU</p>
            <ul className="NavListItem">
              <Link to="/">
                <li>{<BiHomeCircle className="icons" />} Home</li>
              </Link>
              <Link to="/series">
                <li>{<AiOutlineCompass className="icons" />} Series</li>
              </Link>
              <Link to="/upcoming">
                <li>{<BiTime className="icons" />} Upcoming</li>
              </Link>
              <Link to="/discover">
                <li>{<AiOutlineCompass className="icons" />} Discovery</li>
              </Link>
              <Link to="/watchlist">
                <li className="lengthList">
                  {<MdOutlineAddBox />} Watchlist{" "}
                  <p className="length">{watchList.length} </p>
                </li>
              </Link>
              <li>{<HiUserGroup className="icons" />} Community</li>
            </ul>

            <ul>
              <li>{<CgProfile className="icons" />} Profile </li>
              <li>{<IoSettingsOutline className="icons" />} Setting </li>
              <li>{<AiOutlineCloud className="icons" />} Help </li>
              <li>{<BiExit className="icons" />} Exit </li>
            </ul>
          </div>
          <div className="userLogin">
            <div className="userImg">
              {/* {" "} */}
              <img src={userImg} alt="img" />
            </div>
            <div className="user">
              <h3>Falomo Mayowa </h3>
              <p>Mayorfalomo@gmail.com </p>
            </div>
          </div>
          <h4>Log Out </h4>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
