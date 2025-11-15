import React from 'react';

const FilterDropdown = ({ label = 'Filter', options = [], value, onChange, id = 'filter-select' }) => {
  return (
    <div className="filter-dropdown">
      <label className="filter-dropdown-label" htmlFor={id}>{label}</label>
      <select
        id={id}
        className="filter-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;