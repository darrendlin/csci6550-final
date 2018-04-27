import React, { Component } from 'react';

import MasteryItem from './MasteryItem/MasteryItem';

import champion_data from '../champion_data.json';

export default class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assassin: true,
      fighter: true,
      mage: true,
      marksman: true,
      support: true,
      tank: true
    }
    this.toggleChange = this.toggleChange.bind(this);
  }

  toggleChange(event) {
    this.setState({
      [event.target.name]: event.target.checked
    });
  }

  render() {
    const { masteries } = this.props;
    const { assassin, fighter, mage, marksman, support, tank } = this.state;
    const highestMastery = masteries.reduce((max, mastery) => {
      return Math.max(max, mastery['championPoints']);
    }, 0);

    return (
      <div>
        <div className="text-center">
          <div className="pretty p-default p-curve">
            <input type="checkbox" name="assassin" checked={assassin} onChange={this.toggleChange} />
            <div className="state">
              <label>Assassin</label>
            </div>
          </div>
          <div className="pretty p-default p-curve">
            <input type="checkbox" name="fighter" checked={fighter} onChange={this.toggleChange} />
            <div className="state">
              <label>Fighter</label>
            </div>
          </div>
          <div className="pretty p-default p-curve">
            <input type="checkbox" name="mage" checked={mage} onChange={this.toggleChange} />
            <div className="state">
              <label>Mage</label>
            </div>
          </div>
          <div className="pretty p-default p-curve">
            <input type="checkbox" name="marksman" checked={marksman} onChange={this.toggleChange} />
            <div className="state">
              <label>Marksman</label>
            </div>
          </div>
          <div className="pretty p-default p-curve">
            <input type="checkbox" name="support" checked={support} onChange={this.toggleChange} />
            <div className="state">
              <label>Support</label>
            </div>
          </div>
          <div className="pretty p-default p-curve">
            <input type="checkbox" name="tank" checked={tank} onChange={this.toggleChange} />
            <div className="state">
              <label>Tank</label>
            </div>
          </div>
        </div>
        {
          masteries.map(mastery => {
            const key = mastery['championId'];
            return (
              (assassin && champion_data['data'][key]['tags'].includes('Assassin') ||
               fighter && champion_data['data'][key]['tags'].includes('Fighter') ||
               mage && champion_data['data'][key]['tags'].includes('Mage') ||
               marksman && champion_data['data'][key]['tags'].includes('Marksman') ||
               support && champion_data['data'][key]['tags'].includes('Support') ||
               tank && champion_data['data'][key]['tags'].includes('Tank')) ? (<MasteryItem mastery={mastery} max={highestMastery} key={key}></MasteryItem>) : null
            );
          })
        }
      </div>
    );
  }
}
