import React from 'react';

const InputAge = ({ onChange }) => {
  return (
    <input
      className='age-input'
      onChange={onChange}
      maxLength='2'
      placeholder='Age'
    />
  );
};

export default InputAge;
