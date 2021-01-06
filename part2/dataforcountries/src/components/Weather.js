import { React, useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState({ location: {}, current: {} });
  const api_key = process.env.REACT_APP_API_KEY;
  const baseUrl = `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`;

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      console.log("promise fullfilled");
      setWeather(response.data);
    });
  }, [capital]);

  return (
    <div>
      <h2>Weather in {weather.location.name}</h2>
      <p className="bold">
        temperature: <span className='thin'>{weather.current.temperature}</span>
      </p>
      <img src={weather.current.weather_icons} alt={weather.current.weather_descriptions}/>
      <p className="bold">
        wind:{" "}
        <span className='thin'>
          {weather.current.wind_speed} kph direction {weather.current.wind_dir}
        </span>
      </p>
    </div>
  );
};

export default Weather;
