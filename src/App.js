import "./App.css";
import ImageFormLink from "./components/ImageFormLink/ImageFormLink";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import SignIn from "./components/SignIn/SignIn";
import { useState } from "react";
import Register from "./components/Register/Register";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

function App() {
  const [route, setRoute] = useState("signin");
  const [input, setInput] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  console.log(route);
  const onRouteChange = (route) => {
    if (route === "signin") {
      setIsSignedIn(false);
      setImageUrl("");
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  const onUrlChange = (event) => {
    setInput(event.target.value);
  };

  const USER_ID = "majidfer";
  const PAT = "fdc38de6850d4e73ab7c5da36b369088";
  const APP_ID = "my-first-application";
  const MODEL_ID = "face-detection";
  const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";
  const IMAGE_URL = input;

  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});

  const calculateFaceBox = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  // console.log(user);

  const onImageSubmit = (event) => {
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

    const apiRequestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user.id,
      }),
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
      .then((result) => {
        setBox(calculateFaceBox(result));
        fetch("http://localhost:3000/image", apiRequestOptions)
          .then((res) => res.json())
          .then((count) => setUser({ ...user, entries: count }));
      })
      .catch((error) => console.log("error", error));

    // setInput("");
  };

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

  return (
    <div className="App">
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      <ParticlesBg color="#81D99C" type="cobweb" bg={true} />
      {route === "signin" ? (
        <SignIn loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : route === "register" ? (
        <div>
          <Register loadUser={loadUser} onRouteChange={onRouteChange} />
        </div>
      ) : (
        <>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageFormLink
            onUrlChange={onUrlChange}
            onImageSubmit={onImageSubmit}
          />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </>
      )}
    </div>
  );
}

export default App;
