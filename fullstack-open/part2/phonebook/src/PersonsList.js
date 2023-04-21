import React from "react";

import Person from "./Person";

const PersonsList = (props) => {
  return (
    <>
      {props.filtered.map((person) => (
        <Person key={person.id} id={person.id} name={person.name} number={person.number} onDelete={props.delete} />
      ))}
    </>
  );
};

export default PersonsList;
