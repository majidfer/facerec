import React from "react";
import Tilt from "react-parallax-tilt";
import logo from "./face-id.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="ma4 mt0 logo" style={{ height: "150px", width: "150px" }}>
      <Tilt tiltEnable={false} scale={1.3} transitionSpeed={2500}>
        <div className="b--dotted">
          <img src={logo} alt="logo" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
