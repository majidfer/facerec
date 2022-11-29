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

  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});

  const calculateFaceBox = (data) => {
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: data.left_col * width,
      topRow: data.top_row * height,
      rightCol: width - data.right_col * width,
      bottomRow: height - data.bottom_row * height,
    };
  };

  const onImageSubmit = (event) => {
    event.preventDefault();
    setImageUrl(input);
    const requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: input,
      }),
    };

    fetch("http://localhost:3000/imageurl", requestOption)
      .then((response) => response.json())
      .then((result) => {
        setBox(calculateFaceBox(result));

        const apiRequestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: user.id,
          }),
        };
        
        fetch("http://localhost:3000/image", apiRequestOptions)
          .then((res) => res.json())
          .then((count) => setUser({ ...user, entries: count }));
      })
      .catch((error) => console.log("Something gone wrong:", error));
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
