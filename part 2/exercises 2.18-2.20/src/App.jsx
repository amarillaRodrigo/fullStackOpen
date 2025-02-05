import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  const api_key = 'YOUR_API_KEY'; // Reemplaza con tu clave API de OpenWeatherMap

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  useEffect(() => {
    if (search) {
      const results = countries.filter(country =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCountries(results);
      setSelectedCountry(null);
      setWeather(null);
    } else {
      setFilteredCountries([]);
    }
  }, [search, countries]);

  useEffect(() => {
    if (selectedCountry) {
      const capital = selectedCountry.capital[0];
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
        .then(response => {
          setWeather(response.data);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    }
  }, [selectedCountry, api_key]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search for a country..."
      />
      {filteredCountries.length > 10 && <p>Too many matches, specify another filter</p>}
      {filteredCountries.length <= 10 && filteredCountries.length > 1 && (
        <ul>
          {filteredCountries.map(country => (
            <li key={country.cca3}>
              {country.name.common}
              <button onClick={() => handleShowCountry(country)}>Show</button>
            </li>
          ))}
        </ul>
      )}
      {filteredCountries.length === 1 && !selectedCountry && (
        <div>
          <h1>{filteredCountries[0].name.common}</h1>
          <p>Capital: {filteredCountries[0].capital}</p>
          <p>Area: {filteredCountries[0].area} km²</p>
          <h2>Languages</h2>
          <ul>
            {Object.values(filteredCountries[0].languages).map(language => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={filteredCountries[0].flags.png} alt={`Flag of ${filteredCountries[0].name.common}`} width="150" />
        </div>
      )}
      {selectedCountry && (
        <div>
          <h1>{selectedCountry.name.common}</h1>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Area: {selectedCountry.area} km²</p>
          <h2>Languages</h2>
          <ul>
            {Object.values(selectedCountry.languages).map(language => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={selectedCountry.flags.png} alt={`Flag of ${selectedCountry.name.common}`} width="150" />
          {weather && (
            <div>
              <h2>Weather in {selectedCountry.capital}</h2>
              <p>Temperature: {weather.main.temp} °C</p>
              <p>Weather: {weather.weather[0].description}</p>
              <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="weather icon" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
