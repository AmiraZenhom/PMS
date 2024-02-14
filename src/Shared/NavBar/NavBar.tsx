import navImg from "../../assets/images/navbarImg.png";
import navLogo from "../../assets/images/navLogo.png";
import React, { useState } from "react";

import { Typewriter } from "react-simple-typewriter";
export default function NavBar({ adminData }) {
  const [isDarkMode, setIsDarkMode] = useState(() => false);
  // console.log(adminData);

  return (
    <>
      <div
        className=" px-3 py-1 navbarCaption d-flex justify-content-between row "
        style={{ position: "sticky", zIndex: 100, background: "#fff", top: 0 }}
      >
        <div className="col-md-2">
          <img className="navlogo" src={navLogo} alt="" />
        </div>
        <div className="col-md-4">
          <h3 style={{ margin: "auto 0", fontWeight: "bold" }}>
            <span style={{ color: "#ef9b28" }}>
              <Typewriter
                words={[
                  "Project Managment System",
                  "Project Managment System",
                  "Project Managment System",
                ]}
                loop={5}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </h3>
        </div>
        <div className=" w-25 d-flex col-md-5 ">
          <div className="row">
            <div className="navbarImg col-md-4 ">
              <img className="navbarImg" src={navImg} alt="" />
            </div>

            <div className="navCaption col-md-8">
              <span className="ms-3 fw-bold text1"> {adminData.userName} </span>{" "}
              <br />
              <span className="navEmail  ms-3"> {adminData.userEmail} </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
