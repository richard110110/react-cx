import React, { Component } from 'react';
// import { Button } from 'semantic-ui-react';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import {Container} from 'semantic-ui-react';

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Container className = "main">
       <EventDashboard/>
       </Container>
      </div>
    );
  }
}
