import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSuggestions, clearSuggestions, submitSymptoms } from '../actions/index';
import Autosuggest from 'react-autosuggest';

import './theme.css';
import SelectedSymptoms from './SelectedSymptoms';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      lastFetched: 0,
      symptoms: []
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
    this.setState({ symptoms: [ ...symptoms, sug ]});

    return '';
  }

  renderSuggestion(sug, { query, isHighlighted }) {
    return (
      <div>
        {sug}
      </div>
    )
  }

  removeSymptom(symptom) {
    this.setState({
      symptoms: this.state.symptoms.filter(value => value !== symptom)
    })
  }

  onChange(event, { newValue }) {
    this.setState({ term: newValue });
  }

  submitSymptoms(){
    this.props.submitSymptoms(this.state.symptoms);
  }

  render() {
    const { symptomSuggestions } = this.props;
    const inputProps = {
      value: this.state.term,
      onChange: this.onChange.bind(this),
      // onBlur: this.onBlur,
      type: 'search',
      placeholder: 'Enter a symptom',
    };

    return (
      <div className='symptoms-box'>
        <Autosuggest
          suggestions={symptomSuggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
          getSuggestionValue={this.getSuggestionValue.bind(this)}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
        <SelectedSymptoms
          symptoms={this.state.symptoms}
          removeSymptom={this.removeSymptom.bind(this)}
          submitSymptoms={this.submitSymptoms.bind(this)}
        />
      </div>
    );
  }
}

function mapStateToProps({ symptomSuggestions }) {
  return { symptomSuggestions }
}

export default connect(mapStateToProps, { fetchSuggestions, clearSuggestions, submitSymptoms })(SearchBar);
