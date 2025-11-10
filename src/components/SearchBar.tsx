import React from 'react';

type Props = { value: string; onChange: (value: string) => void };
const SearchBar: React.FC<Props> = ({ value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={e => onChange(e.target.value)}
    placeholder="Tìm kiếm sản phẩm..."
    className="search-bar"
  />
);
export default SearchBar;
