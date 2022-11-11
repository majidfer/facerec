import { React, useState } from "react";
import Clarifai from "clarifai";
import "./ImageFormLink.css";
import FaceRecognition from "../FaceRecognition/FaceRecognition";

const ImageFormLink = () => {
  const app = new Clarifai.App({
    apiKey: "cfce0f69a25f4045ac3b0c6a9d82f9e4",
  });

  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (event) => {setInput(event.target.value)};

  const handleSubmit = (event) => {
    event.preventDefault();
    setImageUrl(input);
    app.models
      .predict(
        Clarifai.GENERAL_MODEL,
        "https://samples.clarifai.com/metro-north.jpg"
      )
      .then(
        function (response) {
          console.log(response);
        },
        function (error) {
          console.log(error);
        }
      );
    setInput("");
  };

  return (
    <div>
      <p className="f3">
        {"This app will detect faces in your pictures. Give it a try."}
      </p>
      <form onSubmit={handleSubmit}>
        <div className="center">
          <div className="pa4 br3 shadow-5 form center">
            <input
              className="f4 pa2 w-70 center"
              type={"text"}
              name="input"
              value={input}
              onChange={handleChange}
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
      <FaceRecognition imageUrl={imageUrl} />
    </div>
  );
};

export default ImageFormLink;
