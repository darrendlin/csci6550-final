import React, { Component } from 'react';

import ChampionPortrait from './ChampionPortrait/ChampionPortrait';
import BarComponent from './BarComponent/BarComponent';

import champion_data from '../../champion_data.json';

export default class MasteryItem extends Component {
  render() {
    const { mastery, max } = this.props;
    const championId = mastery['championId'];
    //console.log(mastery);
    return (
      <div className="d-flex align-items-center mb-1">
        <ChampionPortrait championId={championId} championName={champion_data['data'][championId]['name']} championKey={champion_data['data'][championId]['key']}></ChampionPortrait>
        <BarComponent championLevel={mastery['championLevel']} championPoints={mastery['championPoints']} max={max}></BarComponent>
      </div>
    );
  }
}
