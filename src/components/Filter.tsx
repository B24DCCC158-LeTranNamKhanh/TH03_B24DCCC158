import React from 'react';

type Props = {
  categories: string[];
  selected: string;
  onCategoryChange: (cat: string) => void;
  price: { min: number; max: number };
  onPriceChange: (price: { min: number; max: number }) => void;
};
const Filter: React.FC<Props> = ({ categories, selected, onCategoryChange, price, onPriceChange }) => (
  <div className="filter-row">
    <select value={selected} onChange={e => onCategoryChange(e.target.value)}>
      <option value="">--Tất cả danh mục--</option>
      {categories.map(cat => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
    <input
      type="number"
      value={price.min}
      onChange={e => onPriceChange({ ...price, min: Number(e.target.value) })}
      placeholder="Giá từ"
      className="price-input"
    />
    <input
      type="number"
      value={price.max === Infinity ? '' : price.max}
      onChange={e => onPriceChange({ ...price, max: e.target.value ? Number(e.target.value) : Infinity })}
      placeholder="Giá đến"
      className="price-input"
    />
  </div>
);
export default Filter;
