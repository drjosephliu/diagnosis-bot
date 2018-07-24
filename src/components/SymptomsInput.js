import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchSuggestions, clearSuggestions, submitSymptoms } from '../actions/index';
import Autosuggest from 'react-autosuggest';

import InputAge from './InputAge';
import ToggleGender from './ToggleGender';
import TogglePregnancy from './TogglePregnancy';
import SelectedSymptoms from './SelectedSymptoms';

class SymptomsInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      lastFetched: 0,
      symptoms: [],
      errorMsg: '',
      gender: null,
      age: null,
      pregnancy: 0
    };
  }

  onSuggestionsFetchRequested({ value }) {
    let { lastFetched } = this.state;

    if (value.length >= 3 && (new Date() - new Date(lastFetched)) > 300) {
      this.setState({ lastFetched: Date.now() })
      this.props.fetchSuggestions(value);
    }
  }

  onSuggestionsClearRequested() {
    this.props.clearSuggestions();
  }

  getSuggestionValue(sug) {
    const { symptoms } = this.state;
    if (symptoms.length < 3) {
      this.setState({
        symptoms: [ ...symptoms, sug ],
        errorMsg: ''
      });
    } else {
      this.setState({
        errorMsg: 'Please select a maximum of 3 symptoms only'
      });
    }
    return '';
  }

  renderSuggestion(sug, { query, isHighlighted }) {
    return (
      <div>
        {sug[1]}
      </div>
    )
  }

  removeSymptom(symptom) {
    this.setState({
      symptoms: this.state.symptoms.filter(value => value[1] !== symptom),
      errorMsg: ''
    })
  }

  onChange(event, { newValue }) {
    this.setState({ term: newValue });
  }

  handleAge(event) {
    this.setState({ age: event.target.value, errorMsg: '' });
  }

  submitSymptoms(){
    const { age, gender, symptoms, pregnancy } = this.state;
    const symptomsIds = symptoms.map(item => item[0]);

    if (this.validateSymptoms(symptoms) &&  this.validateAge(age) && gender && this.validatePregnancy(pregnancy)) {
      this.props.submitSymptoms(age, gender, pregnancy, symptomsIds, this.props.history);
    }
    else if (!this.validateAge(age)) {
      this.setState({ errorMsg: 'Please put in a valid age.' });
    }
    else if (!gender) {
      this.setState({ errorMsg: 'Please select a gender.' });
    }
    else if (!this.validatePregnancy(pregnancy)) {
      this.setState({ errorMsg: 'Please select pregnant status.'})
    }
    else if (!this.validateSymptoms(symptoms)) {
      this.setState({ errorMsg: 'Please put in at least 1 symptom.' });
    }
  }

  validateAge(age) {
    const parsedAge = parseInt(age, 10);

    if (typeof(parsedAge) !== 'number' || isNaN(parsedAge)) {
      return false;
    }
    return true;
  }

  validateSymptoms(symptoms) {
    if (symptoms.length >= 1 && symptoms.length <= 3) {
      return true;
    }
    return false;
  }

  validatePregnancy(pregnancy) {
    if (pregnancy !== null) {
      return true;
    }
    return false;
  }

  toggleGender(gender) {
    this.setState({ gender });
    if (gender === 2) {
      this.setState({ pregnancy: null })
    } else {
      this.setState({ pregnancy: 0 })
    }
  }

  togglePregnancy(bool) {
    this.setState({ pregnancy: bool });
  }

  render() {
    const { symptomSuggestions } = this.props;
    const { errorMsg, gender, pregnancy } = this.state;
    const inputProps = {
      value: this.state.term,
      onChange: this.onChange.bind(this),
      type: 'search',
      placeholder: 'Enter a symptom',
    };

    return (
      <div className='symptoms-input-container'>
        <div className='left-container'>
          <div className='age-gender-input-container'>
            <InputAge onChange={this.handleAge.bind(this)} />
            <ToggleGender
              onClick={this.toggleGender.bind(this)} gender={gender}
            />
          </div>
          {gender === 2 && <TogglePregnancy
            onClick={this.togglePregnancy.bind(this)}
            pregnancy={pregnancy}
          />}
          <Autosuggest
            suggestions={symptomSuggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
            getSuggestionValue={this.getSuggestionValue.bind(this)}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
          />
        </div>
        <div className='right-container'>
          <SelectedSymptoms
            symptoms={this.state.symptoms.map(item => item[1])}
            removeSymptom={this.removeSymptom.bind(this)}
          />
          <div className='right-bottom-container'>
            <div className='error-message-container'>
              {errorMsg}
            </div>
            <button
              onClick={() => this.submitSymptoms()}
              className='btn btn-primary'>
              Submit
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>

        </div>
      </div>
    );
  }
}

function mapStateToProps({ symptomSuggestions }) {
  return { symptomSuggestions }
}

export default withRouter(connect(mapStateToProps, { fetchSuggestions, clearSuggestions, submitSymptoms })(SymptomsInput));
