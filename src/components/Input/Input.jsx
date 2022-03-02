import React from 'react';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import './input.css';

export const Input = ({
  name,
  placeholder,
  id,
  onChange,
  onClick,
  required,
}) => {
  return (
    <div>
      <input
        required={required}
        type="text"
        name={name}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
      />
      <button onClick={onClick}>
        <ClearOutlinedIcon />
      </button>
    </div>
  );
};
