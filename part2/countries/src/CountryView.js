import React from "react";


const CountryView = (props) => {


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
        <p>temperature {props.weather.temp} Celsius</p>
        <p>wind {props.weather.speed} m/s</p>
      </div>
    </div>
  );
};

export default CountryView;
