import React from "react";
import Person from "./Person";

const Persons = ({ results, removePerson }) => {
  return (
    <>
      {results.map((item) => (
        <Person key={item.name} person={item} removePerson={removePerson} />
      ))}
    </>
  );
};

export default Persons;
