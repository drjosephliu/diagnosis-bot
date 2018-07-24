import React from 'react';

const SelectedSymptoms = ({ symptoms, removeSymptom }) => {

  const renderSymptoms = symptom => {
    return (
      <div key={symptom} className='selected-symptoms-list-item'>
        <li key={symptom}>
          {symptom}
        </li>
        <i
          onClick={() => removeSymptom(symptom)} className="far fa-times-circle">
        </i>
      </div>
    )
  };

  return (
    <div className='selected-symptoms-container'>
      <h5>My Symptoms:</h5>
      <ul className='selected-symptoms-list'>
        {symptoms.map(renderSymptoms)}
      </ul>
    </div>
  );
}

export default SelectedSymptoms;
