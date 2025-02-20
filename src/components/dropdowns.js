import React from 'react';
function Dropdown({ menuItems }) {
  return (
      <select className="dropdown">
        {menuItems.map((item, idx) => (
          <option key={idx}>{item}</option>
        ))}
      </select>
  );
}

export default Dropdown;