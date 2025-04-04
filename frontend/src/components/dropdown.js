import React from "react";
const Dropdown = ({ listItems = [], onChange, children, value,placeholder }) => { 
  // 👆 Valor padrão para evitar erros
  return (
    <div className="dropdown-container ">
      {children}
      <select value={value} onChange={onChange}>
        <option value={placeholder}>{placeholder}</option>
        {listItems.map((item, index) => (
          <option key={index} value={Object.values(item)[0]}>
            {Object.values(item)[0]}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Dropdown;