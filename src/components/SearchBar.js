import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSuggestions } from '../actions/index';
import Autosuggest from 'react-autosuggest';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      lastFetched: 0
    };
    this.renderSuggestions = this.renderSuggestions.bind(this);
  }

  onInputChange(event) {
    let { lastFetched } = this.state;

    this.setState({ term: event.target.value });

    if (event.target.value.length >= 3 && (new Date() - new Date(lastFetched)) > 300) {
      this.setState({ lastFetched: Date.now() })
      this.props.fetchSuggestions(event.target.value);
    }
  }

  renderSuggestions(sug) {
    return (
      <option key={sug} value={sug} onClick={() => console.log('selected')}/>
    )
  }

  render() {
    const { symptomSuggestions } = this.props;
    // console.log(symptomSuggestions)
    return (
      <form className='input-group' style={styles.inputGroup}>
        <input
          type='text'
          className='form-control'
          value={this.state.term}
          onChange={(event) => this.onInputChange(event)}
          list='suggestions'
        />
        <div className='input-group-append'>
          <button type='button' className='btn btn-primary'>
            Add Symptom
          </button>
        </div>
        <datalist id='suggestions'>
          {symptomSuggestions.sort().map(this.renderSuggestions)}
        </datalist>
      </form>
    );
  }
}

const styles = {
  inputGroup: {
    width: '50vw',
    // border: '2px solid red'
  }
}

function mapStateToProps({ symptomSuggestions }) {
  return { symptomSuggestions }
}

export default connect(mapStateToProps, { fetchSuggestions })(SearchBar);
