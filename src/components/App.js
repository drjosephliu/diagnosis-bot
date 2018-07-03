import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import SymptomsInput from './SymptomsInput';
import FollowUpQuestions from './FollowUpQuestions';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route exact path='/' component={SymptomsInput} />
            <Route exact path='/followup' component={FollowUpQuestions} />
          </div>
        </BrowserRouter>
      </div>

    );
  }
}



export default App;
