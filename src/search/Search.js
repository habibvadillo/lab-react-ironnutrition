import React from 'react';
import './Search.css';

const Search = (props) => {
  return (
    <div className="Search">
      <input onChange={props.onSearch} placeholder="Search for something" />
    </div>
  );
};

export default Search;
