import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Re-events</h1>
        <button className="ui icon button">
        <i className="smile icon"></i>
        CSS button
        </button>
        <Button icon = "smile" content = "React Button"/>
      </div>
    )
  }
}
