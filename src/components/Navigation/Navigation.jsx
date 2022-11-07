import React from "react";

const Navigation = () => {
  const tempStyle = { display: "flex", justifyContent: "flex-end" };
  
  return (
    <nav style={tempStyle}>
      <p className="f3 link dim black underline pa3 pointer">Sign out</p>
    </nav>
  );
};

export default Navigation;
