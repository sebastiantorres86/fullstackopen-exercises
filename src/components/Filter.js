import React from "react";

const Filter = ({ searchTerm, handleChange }) => {
  return (
    <div>
      filter shown with <input value={searchTerm} onChange={handleChange} />
    </div>
  );
};

export default Filter;
