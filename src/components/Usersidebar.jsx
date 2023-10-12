import React, { useState } from "react";
import { FaBook, FaCheckDouble, FaList, FaPlay, FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./css/usersidebar.css";
import LOGO2 from "./../image/logo2.png";
import LOGO3 from "./../image/logo3.png";
import Assignedplan from "./Assignedplan";

const Usersidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  const menuItem = [
    {
      path: "/createplan",
      name: "Create plan",
      icon: <FaBook fontSize={"medium"} />,
    },
    {
      path: "/assignedplan",
      name: "Assigned plan",
      icon: <FaList />,
    },
    {
      path: "/resumework",
      name: "Resume work",
      icon: <FaPlay />,
    },
    {
      path: "/completed",
      name: "Completed",
      icon: <FaCheckDouble />,
    },
  ];

  return (
    <div className="container">
      <div style={{ width: isOpen ? "30vw" : "60px" }} className="sidebar">
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassname="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
        <div
          className="sidenav_bottom"
          style={{ marginTop: isOpen ? "37vh" : "52vh" }}
        >
          <div className="btm_img">
            <img
              src={LOGO3}
              className="bottom_image mb-1"
              style={{ height: isOpen ? "100px" : "50px" }}
            />
          </div>
          <div
            className="btm_link"
            style={{ display: isOpen ? "block" : "none" }}
          >
            <p className="btm_text">
              Upgrade to &nbsp;
              <a href="#0000" className="btm_alink">
                Premium plan
              </a>
              &nbsp; to unlock more features.
            </p>
          </div>
        </div>
      </div>
      <main className="main-side">{children}</main>
    </div>
  );
};

export default Usersidebar;
