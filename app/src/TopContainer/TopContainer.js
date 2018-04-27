import React, { Component } from 'react';
import { Form, Row, Col, Input } from 'reactstrap';

export default class TopContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      summonerName: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ summonerName: event.target.value });
  }

  handleSubmit(event) {
    const { search } = this.props;
    search(this.state.summonerName);
    event.preventDefault();
  }

  render() {
    
    return (
      <div>
        <Row className="d-flex justify-content-around m-3">
          <Col sm="4" md="3">
            <Form onSubmit={this.handleSubmit}>
              <Input type="text" name="summonerName" id="summonerName" placeholder="Summoner Name" onChange={this.handleChange} />
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}
