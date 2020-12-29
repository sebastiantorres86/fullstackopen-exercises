import React, { useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (!persons.some((person) => person.name === newName)) {
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    } else {
      alert(`${newName} is already added to the phonebook`);
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const results = !searchTerm
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={handleChange} searchTerm={searchTerm} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons results={results} />
    </div>
  );
};

export default App;
