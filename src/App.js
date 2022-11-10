import "./App.css";
import ImageFormLink from "./components/ImageFormLink/ImageFormLink";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";

function App() {
  return (
    <div className="App">
      <ParticlesBg color="#81D99C" type="cobweb" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageFormLink />
    </div>
  );
}

export default App;
