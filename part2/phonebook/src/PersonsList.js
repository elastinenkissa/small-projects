import Person from "./Person";

const PersonsList = (props) => {
  return (
    <>
      {props.filtered.map((person) => (
        <Person key={person.id} name={person.name} number={person.number} />
      ))}
    </>
  );
};

export default PersonsList;
