import React, { Component } from 'react';

import TopContainer from './TopContainer/TopContainer';
import MainContainer from './MainContainer/MainContainer';

import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import './App.css';

import test_data from './test_data.json';
import riot_api_key from './riot_api_key.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summonerId: 0,
      masteries: []
    };

    this.searchSummoner = this.searchSummoner.bind(this);
  }

  searchSummoner(name) {
    const { key } = riot_api_key;
    if (!key) {
      console.error('no api key!');
      return;
    }
    fetch(`https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${name}?api_key=${key}`)
    .then(resp => resp.json())
    .then(data => {
      this.setState({ summonerId: data['id']})
      if (this.state.summonerId) {
        fetch(`https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/${this.state.summonerId}?api_key=${key}`)
        .then(resp => resp.json())
        .then(data => {
          this.setState({ masteries: data });
        });
      }
    })
  }

  componentDidMount() {
    /*fetch('test_data.json')
    .then(response => response.json())
    .then(data => {
      this.setState({ masteries: data });
      console.log(data);
    })
    .catch(err => {
      if (err) {
        console.error(err);
      }
    });*/
    //this.setState({ masteries: test_data });
  }

  render() {
    const { masteries } = this.state;
    return (
     <div className="container-fluid">
       <TopContainer search={this.searchSummoner}></TopContainer>
       <hr />
       <MainContainer masteries={masteries}></MainContainer>
     </div>
    );
  }
}

export default App;
