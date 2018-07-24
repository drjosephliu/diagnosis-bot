import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchNextFollowUp } from '../actions';

import FollowUpQuestions from './FollowUpQuestions';
import { BounceLoader } from 'react-spinners';

class FollowUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.isLoading === true) {
      this.setState({ isLoading: false });
    }
  }

  submitOption = bool => {
    const { conv_id, quest_id, fetchNextFollowUp } = this.props;
    fetchNextFollowUp(conv_id, quest_id, bool);
    this.setState({ isLoading: true });
  }

  renderFollowUp = () => {
    const { conv_id, conv_state, result, specialties, question, first_round } = this.props;

    // If end of follow up reached, render results
    if (conv_state === "completed") {
      return <Redirect to={{ pathname: '/results', state: { conv_id, result, specialties, first_round }}}/>;
    } else if (conv_state === "during_conversation") {
      return <FollowUpQuestions
        question={question}
        submitOption={this.submitOption}
      />;
    } else if (conv_state === null) {
      return 'Page not found';
    }
  }

  renderLoading = () => {
    return this.state.isLoading ?
      <BounceLoader color={'#90d5f9'} loading={this.state.isLoading} size={100} /> :
      this.renderFollowUp();
  }

  render() {
    return (
      <div className='follow-up-container'>
        {this.renderLoading()}
      </div>
    );
  }
}

function mapStateToProps({ followUp }) {
  return {
    conv_id: followUp.conv_id,
    conv_state: followUp.conv_state,
    quest_id: followUp.quest_id,
    question: followUp.question,
    result: followUp.result,
    specialties: followUp.specialties,
    first_round: followUp.first_round
  }
}

export default connect(mapStateToProps, { fetchNextFollowUp })(FollowUp);
