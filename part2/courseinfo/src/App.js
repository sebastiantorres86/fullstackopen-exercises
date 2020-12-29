import React from "react";
import Course from "./components/Course";

const App = ({ courses }) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      <Course course={courses[0]} />
      <Course course={courses[1]} />
    </div>
  );
};

export default App;
