import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './theme.css';

import Header from './Header';
import SymptomsInput from './SymptomsInput';
import FollowUp from './FollowUp';
import Results from './Results';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div className='container'>
            <Header />
            <div className='content-container'>
              <Route exact path='/' component={SymptomsInput} />
              <Route exact path='/followup' component={FollowUp} />
              <Route exact path='/results' component={Results} />
            </div>
          </div>
        </BrowserRouter>
      </div>

    );
  }
}



export default App;
