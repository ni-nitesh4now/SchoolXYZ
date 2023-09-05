import React, { useState } from "react";
import {
  FaBook,
  FaCheckDouble,
  FaBars,
  FaSchool,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { BiUserCircle, BiRename } from "react-icons/bi";
import { GiPapers, GiProgression } from "react-icons/gi";
import { MdPlayLesson } from "react-icons/md";
import { NavLink } from "react-router-dom";
import "./css/usersidebar.css";
import LOGO2 from "./../image/logo2.png";
import LOGO3 from "./../image/logo3.png";

const Adminsidenav = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  const menuItem = [
    {
      path: "/createuser",
      name: "User",
      icon: <BiUserCircle />,
    },
    {
      path: "/createboard",
      name: "Board",
      icon: <FaSchool />,
    },
    {
      path: "/createclass",
      name: "Class",
      icon: <FaChalkboardTeacher />,
    },
    {
      path: "/createbooks",
      name: "Stream",
      icon: <FaBook />,
    },
    {
      path: "/createpublications",
      name: "Publications",
      icon: <GiPapers />,
    },
    {
      path: "/addbook",
      name: "Book name",
      icon: <BiRename />,
    },
    {
      path: "/createlessonplan",
      name: "Lesson plan",
      icon: <MdPlayLesson />,
    },
    {
      path: "/admincompleted",
      name: "Completed",
      icon: <FaCheckDouble />,
    },
    {
      path: "/workinpro",
      name: "Work in progress",
      icon: <GiProgression />,
    },
  ];

  return (
    <div className="container">
      <div style={{ width: isOpen ? "30vw" : "60px" }} className="sidebar">
        <div className="top_section">
          <img
            style={{ display: isOpen ? "block" : "none" }}
            alt="SP"
            src={LOGO2}
            className="logo_icon"
          />
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            School
          </h1>
          <h1
            style={{ display: isOpen ? "block" : "none" }}
            className="logo_pen"
          >
            Pen
          </h1>
          <div style={{ marginLeft: isOpen ? "0px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
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
          style={{ marginTop: isOpen ? "40px" : "40px" }}
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

export default Adminsidenav;
