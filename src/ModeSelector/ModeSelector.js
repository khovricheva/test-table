import React from 'react';
import './ModeSelector.css';

function ModeSelector({ onSelect }) {
  const smallUrl = `http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`;
  const bigUrl = `http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`;

  return (
    <div className='mode-selector'>
      <button onClick={() => onSelect(smallUrl)} className='btn btn-success'>
        32 elements
      </button>
      <button onClick={() => onSelect(bigUrl)} className='btn btn-danger'>
        1000 elements
      </button>
    </div>
  );
}

export default ModeSelector;
