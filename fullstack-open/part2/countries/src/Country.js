import React, { useState } from "react";
import CountryView from "./CountryView";

const Country = (props) => {
  const [viewShown, setViewShown] = useState(false);
  

  const showViewHandler = () => {
    setViewShown(!viewShown);
  };

  return (
    <li>
      {props.country.name.common}
      <button onClick={showViewHandler}>{viewShown ? "hide" : "show"}</button>
      {viewShown && <CountryView country={props.country} />}
    </li>
  );
};

export default Country;
