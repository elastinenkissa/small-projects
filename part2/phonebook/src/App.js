import { useEffect, useState } from "react";
import NewPerson from "./NewPerson";
import PersonsList from "./PersonsList";
import Search from "./Search";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523", id: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345", id: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredNumbers, setFilteredNumbers] = useState(persons);

  useEffect(() => {
    const match = new RegExp(filter, "gi");
    const filtered = persons.filter((person) => person.name.match(match));
    setFilteredNumbers(filtered);
  }, [filter, persons]);

  const addNumberHandler = (event) => {
    event.preventDefault();
    const numberObject = {
      name: newName,
      number: newNumber,
      id: newNumber,
    };

    if (newName === "" || newName === undefined) {
      alert("Please enter a name");
      return;
    }
    if (newNumber === "" || newNumber === undefined) {
      alert("Please enter a number");
      return;
    }

    var equality = false;

    const sameNumber = [];
    persons.forEach((person) => {
      if (person.id !== numberObject.id) {
        sameNumber.push(false);
      } else {
        sameNumber.push(true);
      }

      if (sameNumber.every((x) => x === false)) {
        equality = true;
        return;
      }
      equality = false;
    });
    if (equality === false) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat(numberObject));
    setNewName("");
    setNewNumber("");
    console.log(persons);
  };

  const changeNameHandler = (event) => {
    setNewName(event.target.value);
  };

  const changeNumberHandler = (event) => {
    setNewNumber(event.target.value);
  };

  const filterNumberHandler = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        <Search filter={filter} onChange={filterNumberHandler} />
      </div>
      <h2>Add a new</h2>
      <NewPerson
        onSubmit={addNumberHandler}
        name={newName}
        number={newNumber}
        onChangeName={changeNameHandler}
        onChangeNumber={changeNumberHandler}
      />
      <h2>Numbers</h2>
      <div>
        <PersonsList filtered={filteredNumbers} />
      </div>
    </div>
  );
};

export default App;
