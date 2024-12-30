// Header.js
import logo from './car.svg'; // Use the existing logo
import './App.css'; // Reuse your CSS file for styling

function Header() {
  return (
    <header className="App-header">
      {/* Logo and Title */}
      <div className="header-content">
        <img src={logo} className="App-logo" alt="PlanMyJourney logo" />
        <h1 className="header-title">PlanMyJourney</h1>
      </div>

      {/* Slogan */}
      <p className="header-slogan">Embark on your next adventure with ease! 🌍✈️🚗</p>
    </header>
  );
}

export default Header;
