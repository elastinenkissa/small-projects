import React from "react";

const Search = (props) => {
  return (
    <>
      Filter by name: <input value={props.filter} onChange={props.onChange} />
    </>
  );
};

export default Search;
