import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Nav from '../components/Nav';

class App extends Component {

  state = {
    listings: [
      {}
    ]
  };

  render() {
    return (
      <div>
        <Nav />
        App is here!
      </div>
    )
  }

}

export default connect(

)(App);
