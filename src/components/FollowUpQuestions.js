import React, { Component } from 'react';
import { connect } from 'react-redux';

class FollowUpQuestions extends Component {
  render() {
    const { conv_id, quest_id, question } = this.props;
    return (
      <div>
        {question && <h5>{question}</h5>}
      </div>
    );
  }
}

function mapStateToProps({ followUp }) {
  return {
    conv_id: followUp.conv_id,
    quest_id: followUp.quest_id,
    question: followUp.question,
  }
}

export default connect(mapStateToProps)(FollowUpQuestions);
