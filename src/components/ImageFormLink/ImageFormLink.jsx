import { React, useState } from "react";
import "./ImageFormLink.css";
import FaceRecognition from "../FaceRecognition/FaceRecognition";

const ImageFormLink = () => {
  const [input, setInput] = useState("");

  const USER_ID = "majidfer";
  const PAT = "fdc38de6850d4e73ab7c5da36b369088";
  const APP_ID = "my-first-application";
  const MODEL_ID = "face-detection";
  const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";
  const IMAGE_URL = input;

  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setImageUrl(input);

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    });

    
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };

    fetch(
      "https://api.clarifai.com/v2/models/" +
        MODEL_ID +
        "/versions/" +
        MODEL_VERSION_ID +
        "/outputs",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => console.log(result.outputs[0].data.regions[0].region_info.bounding_box))
      .catch((error) => console.log("error", error));

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
