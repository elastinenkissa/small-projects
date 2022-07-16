import React from "react";

const Person = (props) => {

  const deleteHandler = () => {
    props.onDelete(props.id, props.name)
  }

  return (
    <>
      <p>
        {props.name} {props.number} <button onClick={deleteHandler}>delete</button>
      </p>
    </>
  );
};

export default Person;
