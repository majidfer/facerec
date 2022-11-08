import './App.css';
import ImageFormLink from './components/ImageFormLink/ImageFormLink';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Logo />
      <ImageFormLink />
    </div>
  );
}

export default App;
