import React from "react";

const Rank = ({name, entries}) => {
  return (
    <>
      <div className="f3 navy">{`${name}, your current rank is ...`}</div>
      <div className="f1 navy">{`${entries}`}</div>
    </>
  );
};

export default Rank;
