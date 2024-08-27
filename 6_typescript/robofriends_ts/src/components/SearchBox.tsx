import React from 'react';

interface SearchBoxProps {
  searchChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ searchChange }) => {
  return (
    <div className="pa2">
      <input
        className="pa3 ba b--green bg-lightest-blue"
        type="search"
        placeholder="search robots"
        onChange={searchChange}
      />
    </div>
  );
};

export default SearchBox;
