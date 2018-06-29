import React, { Component } from 'react';

import SearchBar from './SearchBar';

class App extends Component {
  render() {
    return (
      <div className="container" style={styles.container}>
        <h1>Welcome to Dr Diagnosis!</h1>
        <h5>Type in a symptom to get started:</h5>
        <SearchBar />
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
    // border: '2px solid red'
  }
}

export default App;
