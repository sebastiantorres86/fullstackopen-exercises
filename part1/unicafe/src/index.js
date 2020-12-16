import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistic = ({ name, value }) => (
  <>
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  </>
);

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ good, neutral, bad, allClicks, average, positive }) => {
  return (
    <div>
      <table>
        <tbody>
          <Statistic name="good" value={good} />
          <Statistic name="neutral" value={neutral} />
          <Statistic name="bad" value={bad} />
          <Statistic name="all" value={allClicks} />
          <Statistic name="average" value={average} />
          <Statistic name="positive" value={positive} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allClicks, setAll] = useState(0);
  const [goodPoints, setGoodPoints] = useState(0);
  const [badPoints, setBadPoints] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
    setAll(allClicks + 1);
    setGoodPoints(goodPoints + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setAll(allClicks + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
    setAll(allClicks + 1);
    setBadPoints(badPoints - 1);
  };

  const average = (goodPoints + badPoints) / allClicks;
  const positive = `${(goodPoints / allClicks) * 100} %`;

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <h1>statistics</h1>
      {allClicks === 0 ? (
        <div>No feedback given</div>
      ) : (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          allClicks={allClicks}
          average={average}
          positive={positive}
        />
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
