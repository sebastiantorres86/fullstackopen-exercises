import React from "react";
import Weather from './Weather'

const CountryInfo = ({ country }) => {
  return (
    <>
      {country.map((item) => (
        <div className="test" key={item.name}>
          <h1>{item.name}</h1>
          <p>capital {item.capital}</p>
          <p>population {item.population}</p>
          <h2>languages</h2>

          <ul>
            {item.languages.map((lang) => (
              <li key={lang.name}>{lang.name}</li>
            ))}
          </ul>
          <img src={item.flag} alt="" />
          <Weather capital={item.capital} />
        </div>
      ))}
    </>
  );
};

export default CountryInfo;
