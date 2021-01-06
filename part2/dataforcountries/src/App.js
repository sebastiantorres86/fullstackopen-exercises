import { React, useState, useEffect } from "react";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
import countryService from "./services/countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    countryService.getAll().then((countries) => {
      setCountries(countries);
      console.log(countries);
    });
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const results = !searchTerm
    ? countries
    : countries.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      );

  const handleClick = (val) => {
    setSearchTerm(val);
    console.log("clicked", searchTerm);
  };
  return (
    <div>
      <Filter handleChange={handleChange} searchTerm={searchTerm} />
      <Countries results={results} handleClick={handleClick} />
    </div>
  );
}

export default App;
