import { useState } from 'react';
import logo from './car.svg';
import './App.css';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';




function App() {
  
  // State to store the search query, selected state, selected city, selected tourist places, and selected transport mode
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedPlaces, setSelectedPlaces] = useState([]);  // Array for multi-selection of tourist places
  const [selectedTransport, setSelectedTransport] = useState('');  // Single selection for transport mode

  // List of states with their corresponding cities and tourist places
  const states = [
    { name: 'Karnataka', image: '/images/karnataka.jpg', cities: [
        { name: 'Bangalore', image: '/images/bangalore.jpg', places: [
          { name: 'Lalbagh Botanical Garden', image: '/images/lalbagh.jpg' },
          { name: 'Bangalore Palace', image: '/images/bangalore-palace.jpg' },
          { name: 'Vidhana Soudha', image: '/images/vidhana-soudha.jpg' },
        ] },
        { name: 'Mysore', image: '/images/mysore.jpg', places: [
          { name: 'Mysore Palace', image: '/images/mysore-palace.jpg' },
          { name: 'Chamundi Hill', image: '/images/chamundi-hill.jpg' },
          { name: 'Brindavan Gardens', image: '/images/brindavan-gardens.jpg' },
        ] },
        { name: 'Mangalore', image: '/images/mangalore.jpg', places: [
          { name: 'Panambur Beach', image: '/images/panambur-beach.jpg' },
          { name: 'Mangaladevi Temple', image: '/images/mangaladevi-temple.jpg' },
          { name: 'Kadri Manjunath Temple', image: '/images/kadri-temple.jpg' },
        ] },
      ] },
    { name: 'Gujarat', image: '/images/gujarat.jpg', cities: [
      { name: 'Ahmedabad', image: '/images/ahmedabad.jpg', places: [] },
      { name: 'Surat', image: '/images/surat.jpg', places: [] },
      { name: 'Vadodara', image: '/images/vadodara.jpg', places: [] },
    ] },
    // Add other states here...
    { name: 'Rajasthan', image: '/images/rajasthan.jpg', cities: [{ name: 'Jaipur', image: '/images/jaipur.jpg' }, { name: 'Udaipur', image: '/images/udaipur.jpg' }, { name: 'Jodhpur', image: '/images/jodhpur.jpg' }] },
    { name: 'Tamil Nadu', image: '/images/tamilnadu.jpg', cities: [{ name: 'Chennai', image: '/images/chennai.jpg' }, { name: 'Coimbatore', image: '/images/coimbatore.jpg' }, { name: 'Madurai', image: '/images/madurai.jpg' }] },
    { name: 'Uttar Pradesh', image: '/images/uttarpradesh.jpg', cities: [{ name: 'Lucknow', image: '/images/lucknow.jpg' }, { name: 'Agra', image: '/images/agra.jpg' }, { name: 'Varanasi', image: '/images/varanasi.jpg' }] },
  ];

  // List of transport modes
  const transportModes = ['Car', 'Bus', 'MiniCab', 'Auto', 'Bicycle'];
  

  const handleSearch = async () => {
  try {
    const response = await fetch("http://localhost:3001/submit-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchQuery,
        selectedState,
        selectedCity,
        selectedPlaces,
        selectedTransport,
      }),
    });

    const result = await response.json();

    // Alerting the user with a cute, friendly response
    alert(result.message); // 🎉 YAY! Your response has been successfully submitted! 🎉
    alert(result.journeyCost); // 💸 The estimated cost for your journey is ₹{journeyCost} ✨
    alert(result.thankYouMessage); // 🚀 You will be soon connected to a friendly service provider!
  } catch (error) {
    alert("Oops! Something went wrong... Please try again later. 💔");
  }
};

  


  // Function to handle state selection
  const handleStateSelection = (stateName) => {
    setSelectedState(stateName);
    setSelectedCity('');
    setSelectedPlaces([]);  // Reset places when changing state
  };

  // Function to handle city selection
  const handleCitySelection = (cityName) => {
    setSelectedCity(cityName);
    setSelectedPlaces([]);  // Reset places when changing city
  };

  // Function to toggle place selection (for multi-selection)
  const togglePlaceSelection = (placeName) => {
    setSelectedPlaces((prevSelected) =>
      prevSelected.includes(placeName)
        ? prevSelected.filter((name) => name !== placeName)
        : [...prevSelected, placeName]
    );
  };

  // Function to handle transport selection (single selection)
  const handleTransportSelection = (transport) => {
    setSelectedTransport(transport);  // Set only one mode of transport
  };

  return (
    <div className="App">
      <Sidebar/>
    
      <Header/>
      <header className="App-header">
        {/* Display the logo */}
        <img src={logo} className="App-logo" alt="logo" />
        
        {/* App title */}
        <h1 className="logoname">PlanMyJourney</h1>

        {/* Search bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {/* State Selector */}
        <div className="state-selector">
          <h2>Select State:</h2>
          <div className="state-carousel">
            {states.map((state) => (
              <div
                key={state.name}
                className={`state-card ${selectedState === state.name ? 'selected' : ''}`}
                onClick={() => handleStateSelection(state.name)}
              >
                <img
                  src={state.image}
                  alt={state.name}
                  className="state-image"
                />
                <h3 className="state-name">{state.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* City Selector */}
        {selectedState && (
          <div className="city-selector">
            <h2>Select City in {selectedState}:</h2>
            <div className="state-carousel">
              {states
                .find(state => state.name === selectedState)
                .cities.map((city) => (
                  <div
                    key={city.name}
                    className={`state-card ${selectedCity === city.name ? 'selected' : ''}`}
                    onClick={() => handleCitySelection(city.name)}
                  >
                    <img
                      src={city.image}
                      alt={city.name}
                      className="state-image"
                    />
                    <h3 className="state-name">{city.name}</h3>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Tourist Place Selector for Karnataka */}
        {selectedState === 'Karnataka' && selectedCity && (
          <div className="place-selector">
            <h2>Select Tourist Places in {selectedCity}:</h2>
            <div className="state-carousel">
              {states
                .find(state => state.name === 'Karnataka')
                .cities.find(city => city.name === selectedCity)
                .places.map((place) => (
                  <div
                    key={place.name}
                    className={`state-card ${selectedPlaces.includes(place.name) ? 'selected' : ''}`}
                    onClick={() => togglePlaceSelection(place.name)}
                  >
                    <img
                      src={place.image}
                      alt={place.name}
                      className="state-image"
                    />
                    <h3 className="state-name">{place.name}</h3>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Mode of Transport Selector */}
{/* Mode of Transport Selector */}
<div className="transport-selector">
  <h2>Select Mode of Transport:</h2>
  <div className="state-carousel">
    {transportModes.map((mode) => (
      <div
        key={mode}
        className={`state-card ${selectedTransport === mode ? 'selected' : ''}`}
        onClick={() => handleTransportSelection(mode)}
      >
        {/* Placeholder image for the mode */}
        <img
          src={`https://via.placeholder.com/100?text=${mode}`}
          alt={mode}
          className="state-image"
        />

        <h3 className="state-name" style={{ color: '#333', fontWeight: 'bold', marginTop: '8px' }}>
          {mode}
        </h3>
      </div>
        ))}
         </div>
      </div>
       <div className='submit'>
         <button type='submit' onClick={handleSearch}>Submit My Response</button>
         </div>

        {/* Link to React documentation */}
        <a
          className="App-link"
          href="https://www.google.com/maps"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Map
        </a>
        <div className="transport-selector">
            <h2>Thankyou For JoinUs</h2>
 
        </div>

        <div className="transport-selector">
           <h2>Thankyou For JoinUs</h2>
 
          </div>

      </header>
      <Footer />
    </div>
  );
}

export default App;
