import React, { useEffect, useState } from "react";

import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [shownCountries, setShownCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data.map((country) => country));
    });
  }, []);

  useEffect(() => {
    const match = new RegExp(filter, 'gi');
    const filtered = countries.filter((country) =>
      country.name.common.match(match)
    );
    setShownCountries(filtered);
  }, [filter]);

  const filterHandler = (event) => {
    setFilter(event.target.value);
    console.log(shownCountries);
  };

  const showHandler = () => {
    if (shownCountries.length > 10) {
      return "Too many matches, specify another filter";
    } else if (shownCountries.length === 0) {
      return;
    } else if (shownCountries.length === 1) {
      const country = shownCountries[0];
      const languages = Object.values(country.languages);
      return (
        <div>
          <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
          </div>
          <div>
            <h4>languages:</h4>
            <ul>
              {languages.map((language) => {
                return <li key={language}>{language}</li>;
              })}
            </ul>
          </div>
          <div>
            <img src={country.flags.png} alt={country.name.common} />
          </div>
        </div>
      );
    }
    return shownCountries.map((country) => {
      return <li key={country.name.common}>{country.name.common}</li>;
    });
  };

  const show = showHandler();

  return (
    <>
      <div>
        find countries <input value={filter} onChange={filterHandler} />
        <ul>{show}</ul>
      </div>
    </>
  );
};

export default App;
