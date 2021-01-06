import React from "react";
import Country from "./Country";
import CountryInfo from "./CountryInfo";

const Countries = ({ results, handleClick, weatherData }) => {
  const totalCountries = results.length;

  if (totalCountries >= 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (totalCountries > 1) {
    return (
      <>
        {results.map((item) => (
          <Country key={item.name} country={item} handleClick={handleClick} />
        ))}
      </>
    );
  } else {
    console.log(results);
    return (
      <div>
        <CountryInfo country={results} weatherData={weatherData} />
      </div>
    );
  }
};

export default Countries;
