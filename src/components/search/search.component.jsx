import React from 'react';
import './search.component.scss';

const SearchBar = ({ placeholder, setSearch }) => {
  return (
    <div className="search--box">
      <input
        type="search"
        placeholder={placeholder}
        onChange={event => setSearch(event.target.value)}
      />
    </div>
  );
};

export default SearchBar;
