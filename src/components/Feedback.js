import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitFeedback } from '../actions/index';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenOption: null,
      feedback: '',
      error: ''
    }
  }

  renderGoodOpacity() {
    if (this.state.chosenOption === 3) {
      return { opacity: 1.0 }
    }
  }

  renderNeutralOpacity() {
    if (this.state.chosenOption === 2) {
      return { opacity: 1.0 }
    }
  }

  renderBadOpacity() {
    if (this.state.chosenOption === 1) {
      return { opacity: 1.0 }
    }
  }

  handleClick(chosenOption) {
    this.setState({ chosenOption });
  }

  onChange(event) {
    this.setState({ feedback: event.target.value })
  }

  onSubmit() {
    const { chosenOption, feedback } = this.state;
    const { conv_id } = this.props;

    if (chosenOption != null) {
      this.props.submitFeedback(conv_id, chosenOption, feedback)
        .then(() => this.props.close());
    }
    else {
      this.setState({ error: 'Please select how you feel!' })
    }
  }

  render() {

    return (
        <div className='feedback-container'>
          <h5>Was it helpful?</h5>
            <div className='smiley-container'>
              <i
                className="fas fa-frown fa-3x"
                style={this.renderBadOpacity()}
                onClick={() => this.handleClick(1)}
              ></i>
              <i
                className="fas fa-meh fa-3x"
                style={this.renderNeutralOpacity()}
                onClick={() => this.handleClick(2)}
              ></i>
              <i
                className="fas fa-smile fa-3x"
                style={this.renderGoodOpacity()}
                onClick={() => this.handleClick(3)}
              ></i>
            </div>
          <textarea
            className='feedback-input'
            onChange={this.onChange.bind(this)}
            placeholder={"Comments"}
          />
          <div className='error-msg'>
            {this.state.error}
          </div>
          <button
            onClick={this.onSubmit.bind(this)}
            className='btn btn-primary'
          >
            Submit
          </button>
        </div>
    )
  }
};

export default connect(null, { submitFeedback })(Feedback);
