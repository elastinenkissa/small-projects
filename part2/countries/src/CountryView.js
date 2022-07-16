import axios from "axios";
import React, { useEffect, useState } from "react";


const CountryView = (props) => {

  const [weather, setWeather] = useState({});

  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${props.country.capital}&aqi=no`
      )
      .then((res) => {
        setWeather({
          temp: res.data.current.temp_c,
          wind: res.data.current.wind_kph,
          icon: res.data.current.condition.icon,
          text: res.data.current.condition.text
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div>
        <h2>{props.country.name.common}</h2>
        <p>capital {props.country.capital}</p>
        <p>area {props.country.area}</p>
      </div>
      <div>
        <h4>languages:</h4>
        <ul>
          {Object.values(props.country.languages).map((language) => {
            return <li key={language}>{language}</li>;
          })}
        </ul>
      </div>
      <div>
        <img src={props.country.flags.png} alt={props.country.name.common} />
      </div>
      <div>
        Weather in {props.country.capital}
        <p>temperature {weather.temp} Celsius</p>
        <img src={weather.icon} alt={weather.text} />
        <p>wind {weather.wind} km/h</p>
      </div>
    </div>
  );
};

export default CountryView;
