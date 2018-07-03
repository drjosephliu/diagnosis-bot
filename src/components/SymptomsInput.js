import React from 'react';
import SearchBar from './SearchBar';

import SelectedSymptoms from './SelectedSymptoms';

const SymptomsInput = () => {
  return (
    <div className="container" style={styles.container}>
      <h1>Find The Right Specialist:</h1>
      <SearchBar />
    </div>
  )
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
  }
}

export default SymptomsInput;
