import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState(null);
  const [style, setStyle] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const duplicateName = persons.some((person) => person.name === newName);
    const duplicateNumber = persons.some(
      (person) => person.number === newNumber
    );

    if (!duplicateName) {
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setStyle("success");
        setMessage(`Added ${personObject.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    } else if (duplicateName && duplicateNumber) {
      window.alert(`${newName} is already added to the phonebook`);
    } else if (duplicateName && !duplicateNumber) {
      const person = persons.find((person) => person.name === newName);
      const changedPerson = { ...person, number: newNumber };
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
        ? personService
            .update(changedPerson.id, changedPerson)
            .then((response) => {
              setPersons(
                persons.map((person) =>
                  person.id !== changedPerson.id ? person : response
                )
              );
              setStyle("success");
              setMessage(`Updated ${personObject.name}`);
              setTimeout(() => {
                setMessage(null);
              }, 5000);
            })
        : setPersons(persons);
    }

    setNewName("");
    setNewNumber("");
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

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
        .then(() => {
          const del = persons.filter((person) => id !== person.id);
          setPersons(del);
        })
        .catch((error) => {
          setStyle("error");
          setMessage(
            `Information of ${name} has already been removed from server`
          );
          setTimeout(() => {
            setMessage(null);
            setPersons(persons.filter((person) => id !== person.id));
          }, 5000);
        });
    }
  };

  const results = !searchTerm
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification style={style} message={message} />
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
      <Persons results={results} removePerson={removePerson} />
    </div>
  );
};

export default App;
