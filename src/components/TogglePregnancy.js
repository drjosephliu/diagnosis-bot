import React from 'react';

const TogglePregnancy = ({ pregnancy, onClick }) => {

  const renderPregnantOpacity = () => {
    if (pregnancy === 1) {
      return { opacity: '1.0' }
    }
    return { opacity: '0.5' }
  }

  const renderNotPregnantOpacity = () => {
    if (pregnancy === 0) {
      return { opacity: '1.0' }
    }
    return { opacity: '0.5' }
  }

  return (
    <div className='btn-group pregnancy-container'>
      <button
        className='btn btn-secondary'
        onClick={() => onClick(1)}
        style={renderPregnantOpacity()}
      >
        Pregnant
      </button>
      <button
        className='btn btn-secondary'
        onClick={() => onClick(0)}
        style={renderNotPregnantOpacity()}
      >
        Not Pregnant/Not sure
      </button>
    </div>
  );
}

export default TogglePregnancy;
