import React from "react";
import Person from "./Person";

const Persons = ({ results }) => {
  return (
    <>
      {results.map((item) => (
        <Person key={item.name} person={item} />
      ))}
    </>
  );
};

export default Persons;
