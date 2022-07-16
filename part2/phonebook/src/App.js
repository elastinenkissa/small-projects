import React, { useEffect, useState } from "react";

import NewPerson from "./NewPerson";
import PersonsList from "./PersonsList";
import Search from "./Search";

import numberService from "./services/communication";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredNumbers, setFilteredNumbers] = useState(persons);

  useEffect(() => {
    numberService.getAll().then((numbers) => setPersons(numbers));
  }, []);

  useEffect(() => {
    const match = new RegExp(filter, "gi");
    const filtered = persons.filter((person) => person.name.match(match));
    setFilteredNumbers(filtered);
  }, [filter, persons]);

  const deleteHandler = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      numberService.deleteObject(id).then((res) => {
        setPersons(
          persons.map((person) => {
            return person.id !== res.id && person;
          })
        );
      });
    }
  };

  const addNumberHandler = (event) => {
    event.preventDefault();
    const numberObject = {
      name: newName,
      number: newNumber,
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
      if (!(person.name === numberObject.name)) {
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
      const updatingPerson = persons.find((person) => person.name === newName);
      const updatedPerson = { ...updatingPerson, number: newNumber };
      if (
        window.confirm(
          `${newName} is already added to the phonebook. Replace the old number with a new one?`
        )
      ) {
        numberService.update(updatingPerson.id, updatedPerson).then((res) => {
          setPersons(
            persons.map((person) =>
              person.id !== updatingPerson.id ? person : res
            )
          );
        });
        setNewName("");
        setNewNumber("");
      }
      return;
    }
    numberService.create(numberObject).then((newNumber) => {
      setPersons(persons.concat(newNumber));
      setNewName("");
      setNewNumber("");
    });
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
        <PersonsList filtered={filteredNumbers} delete={deleteHandler} />
      </div>
    </div>
  );
};

export default App;
