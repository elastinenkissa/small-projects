import React, { useEffect, useState } from "react";

import axios from "axios";
import CountryList from "./CountryList";

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
    const match = new RegExp(filter, "gi");
    const filtered = countries.filter((country) =>
      country.name.common.match(match)
    );
    setShownCountries(filtered);
  }, [filter]);

  const filterHandler = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <div>
        find countries <input value={filter} onChange={filterHandler} />
        <CountryList shownCountries={shownCountries} />
      </div>
    </>
  );
};

export default App;
