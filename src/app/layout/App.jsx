import React, { Component } from 'react';
// import { Button } from 'semantic-ui-react';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
       <EventDashboard/>
      </div>
    );
  }
}
