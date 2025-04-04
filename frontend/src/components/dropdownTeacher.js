import React from "react";

const DropdownTeacher = ({ listItems = [], onChange, children, value, placeholder }) => {
  return (
    <div className="dropdown-container">
      {children}
      <select value={value} onChange={onChange}>
        <option value="">{placeholder}</option>
        {listItems.length === 0 ? (<option value="">...</option>):(null)}
        {listItems.map((teacher, index) => (
          <option key={index} value={teacher.teacher_name}>
            {teacher.teacher_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownTeacher;


