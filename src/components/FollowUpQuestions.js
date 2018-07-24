import React from 'react';

const FollowUpQuestions = ({ question, submitOption }) => {
  return (
    <div className='follow-up-questions-container'>
      {question &&
        <div className='follow-up-question'>
          <h5>{question}</h5>
        </div>}
      <div className='btn-group btn-group-lg'>
        <button
          type='submit'
          className='btn btn-primary'
          onClick={() => submitOption('true')}
        >
          <i className="fas fa-check fa-2x"></i>
        </button>
        <button
          type='submit'
          className='btn btn-secondary'
          onClick={() => submitOption('false')}
        >
          I don't know
        </button>
        <button
          type='submit'
          className='btn btn-danger'
          onClick={() => submitOption('false')}
        >
          <i className="fas fa-times fa-2x"></i>
        </button>
      </div>
    </div>
  )
}

export default FollowUpQuestions;
