import React from "react";
import "./ImageFormLink.css";

const ImageFormLink = ({ onUrlChange, onImageSubmit }) => {
  return (
    <div>
      <p className="f3">
        {"This app will detect faces in your pictures. Give it a try."}
      </p>
      <form onSubmit={onImageSubmit}>
        <div className="center">
          <div className="pa4 br3 shadow-5 form center">
            <input
              className="f4 pa2 w-70 center"
              type={"text"}
              name="input"
              onChange={onUrlChange}
            />
            <button
              className="w-30 grow f4 link ph3 pv2 dib white bg-green br2"
              type="submit"
            >
              Detect
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ImageFormLink;
