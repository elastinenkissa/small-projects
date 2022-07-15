import axios from "axios";
import React, { useState } from "react";
import CountryView from "./CountryView";

const Country = (props) => {
  const [viewShown, setViewShown] = useState(false);
  const [weather, setWeather] = useState({});

  const API_KEY = process.env.REACT_APP_API_KEY;

  const getWeather = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${props.country.capital}&appid==${API_KEY}`
      )
      .then((res) => {
        console.log(res.data);
        setWeather({ temp: res.data.main.temp, wind: res.data.main.speed });
      });
      console.log(weather)
  };

  const showViewHandler = () => {
    viewShown ? setViewShown(false) : setViewShown(true);
    getWeather();
  };

  return (
    <li>
      {props.country.name.common}{" "}
      <button onClick={showViewHandler}>{viewShown ? "hide" : "show"}</button>
      {viewShown && <CountryView country={props.country} weather={weather} />}
    </li>
  );
};

export default Country;
