import React, { Component } from 'react';

export default class ChampionPortrait extends Component {
  render() {
    const { championId, championName, championKey } = this.props;
    return (
      <div className="d-flex flex-column align-items-center" style={{ width: '100px'}}>
        <img className="champion-portrait rounded" src={`/champion/${championKey}.png`} alt="champion portrait" />
        <span className="lead">{championName}</span>
      </div>
    );
  }
}
