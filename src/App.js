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
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
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
          <Rank name={user.name} entries={user.entries}/>
          <ImageFormLink />
        </>
      )}
    </div>
  );
}

export default App;
