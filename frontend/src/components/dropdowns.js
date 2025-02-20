function Dropdown({ menuItems, onChange }) {
  return (
    <select className="dropdown" onChange={onChange}>
      {menuItems.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
