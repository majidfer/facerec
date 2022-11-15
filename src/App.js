import "./App.css";
import ImageFormLink from "./components/ImageFormLink/ImageFormLink";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import SignIn from "./components/SignIn/SignIn";
import { useState } from "react";
import Register from "./components/Register/Register";

function App() {
  const [route, setRoute] = useState("signin");

  const onRouteChange = (route) => {
    setRoute(route);
  };

  return (
    <div className="App">
      <Navigation onRouteChange={onRouteChange} />
      <ParticlesBg color="#81D99C" type="cobweb" bg={true} />
      {route === "signin" ? (
        <>
          <SignIn onRouteChange={onRouteChange} />
          <Register />
        </>
      ) : (
        <div>
          <Logo />
          <Rank />
          <ImageFormLink />
        </div>
      )}
    </div>
  );
}

export default App;
