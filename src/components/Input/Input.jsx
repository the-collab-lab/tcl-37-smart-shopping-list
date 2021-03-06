import React, { useState } from 'react';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import './input.css';

const Input = ({
  required,
  name,
  placeholder,
  ariaLabel,
  id,
  value,
  onChange,
  onClick,
}) => {
  const [showClear, setShowClear] = useState(false);

  const handleFocus = () => {
    setShowClear(true);
  };

  return (
    <div>
      <input
        className="text-field"
        required={required}
        type="text"
        name={name}
        placeholder={placeholder}
        aria-label={ariaLabel}
        id={id}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
      />
      {value && showClear && (
        <button className="clear" onClick={onClick}>
          <ClearOutlinedIcon style={{ color: '#9e9ea7', fontSize: '1em' }} />
        </button>
      )}
    </div>
  );
};

export default Input;
