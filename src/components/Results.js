import React, { Component } from 'react';
import ResultsChart from './ResultsChart';
import Feedback from './Feedback';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOption: 'specialties',
      showFeedback: true
    };
  }

  handleClick = (option) => {
    this.setState({ showOption: option });
  }

  renderDiagnosisOpacity = () => {
    if (this.state.showOption === 'diagnoses') {
      return { opacity: '1.0' }
    }
    return { opacity: '0.5' }
  }

  renderSpecialtiesOpacity = () => {
    if (this.state.showOption === 'specialties') {
      return { opacity: '1.0' }
    }
    return { opacity: '0.5' }
  }

  renderFirstRoundOpacity = () => {
    if (this.state.showOption === 'first-round') {
      return { opacity: '1.0' }
    }
    return { opacity: '0.5' }
  }

  renderChart() {
    const { result, specialties, first_round } = this.props.location.state;
    switch (this.state.showOption) {
      case 'specialties':
        return <ResultsChart
          title={'List of recommended specialties'}
          xData={JSON.parse(specialties).map(obj => obj.name)}
          yData={JSON.parse(specialties).map(obj => obj.score)}
        />;
      case 'diagnoses':
        return <ResultsChart
          title={'List of probable diagnoses'}
          xData={JSON.parse(result).map(obj => obj.diagnosis)}
          yData={JSON.parse(result).map(obj => obj.score)}
        />;
      case 'first-round':
        return <ResultsChart
          title={'First round results'}
          xData={JSON.parse(first_round).map(obj => obj.diagnosis)}
          yData={JSON.parse(first_round).map(obj => obj.prob)}
        />;
      default:
        return 'Page not found';
    }
  }

  closeFeedback() {
    this.setState({ showFeedback: false })
  }

  render() {
    const { conv_id } = this.props.location.state;

    return (
      <div className='results-container'>
        {this.state.showFeedback &&
          <Feedback
            close={this.closeFeedback.bind(this)}
            conv_id={conv_id}
          />}
        <div className='btn-group'>
          <button
            className='btn btn-primary'
            onClick={() => this.handleClick('specialties')}
            style={this.renderSpecialtiesOpacity()}
          >
            1
          </button>
          <button
            className='btn btn-primary'
            onClick={() => this.handleClick('diagnoses')}
            style={this.renderDiagnosisOpacity()}
          >
            2
          </button>
          <button
            className='btn btn-primary'
            onClick={() => this.handleClick('first-round')}
            style={this.renderFirstRoundOpacity()}
          >
            3
          </button>
        </div>
        {this.renderChart()}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <a href='/' style={{ margin: '0 auto' }}>
            Restart
          </a>
          <b>conversation_id:</b> {conv_id}
        </div>
      </div>
    );
  }
}

export default Results;
