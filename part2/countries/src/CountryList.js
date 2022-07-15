import React from "react";
import Country from "./Country";
import CountryView from "./CountryView";

const CountryList = (props) => {
  const showHandler = () => {
    if (props.shownCountries.length > 10) {
      return "Too many matches, specify another filter";
    } else if (props.shownCountries.length === 0) {
      return;
    } else if (props.shownCountries.length === 1) {
      const country = props.shownCountries[0];
      return (
        <CountryView country={country} />
      );
    }
    return props.shownCountries.map((country) => {
      return (
        <Country key={country.name.common} country={country} />
      );
    });
  };

  const show = showHandler();

  return <ul>{show}</ul>;
};

export default CountryList;
