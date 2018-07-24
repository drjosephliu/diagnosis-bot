import React from 'react';

const ToggleGender = ({ gender, onClick}) => {

  const renderOpacityMale = () => {
    if (gender === 1) {
      return { opacity: '1.0' }
    }
    return { opacity: '0.5' }
  }

  const renderOpacityFemale = () => {
    if (gender === 2) {
      return { opacity: '1.0' }
    }
    return { opacity: '0.5' }
  }

  return (
    <div className='btn-group'>
      <button
        className='btn btn-primary'
        onClick={() => onClick(1)}
        style={renderOpacityMale()}
      >
        Male
      </button>
      <button
        className='btn btn-danger'
        onClick={() => onClick(2)}
        style={renderOpacityFemale()}
      >
        Female
      </button>
    </div>
  );
}

export default ToggleGender;
