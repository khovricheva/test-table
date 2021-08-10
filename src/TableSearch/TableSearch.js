import React, { useState } from 'react';
import './TableSearch.css';

function TableSearch({ onSearch }) {
  const [value, setValue] = useState('');

  const valueChangeHandler = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className='input-group mb-3 mt-3'>
      <div className='input-group-prepend'>
        <button
          className='btn btn-outline-secondary'
          type='button'
          onClick={() => onSearch(value)}
        >
          Button
        </button>
      </div>
      <input
        type='text'
        className='form-control'
        value={value}
        onChange={valueChangeHandler}
      />
    </div>
  );
}

export default TableSearch;
