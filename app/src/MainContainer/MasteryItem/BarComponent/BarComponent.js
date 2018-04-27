import React, { Component } from 'react';

export default class BarComponent extends Component {
  render() {
    const { championLevel, championPoints, max } = this.props;
    return (
      <div className="ml-2 border-left w-75 d-flex align-items-center">
        <span className="bar" style={{ width: `${championPoints/max*100}%` }}></span>
        <img src={`Champion_Mastery_Level_${championLevel}_Flair.png`} alt={`mastery-${championLevel}`}/>
        <span>{championPoints.toLocaleString('en')}</span>
      </div>
    );
  }
}
