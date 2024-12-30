// Footer.js
import './App.css'; // Reusing the CSS file you already have

function Footer() {
  return (
    <footer className="App-footer">
      <p>🌍 Discover amazing places and plan your journey with us! 🚗 ✈️ 🚌 🚂</p>
      <div className="footer-links">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
      </div>
      <p>© {new Date().getFullYear()} PlanMyJourney - All Rights Reserved</p>
    </footer>
  );
}

export default Footer;
