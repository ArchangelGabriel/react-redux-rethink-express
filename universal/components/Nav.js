import React, { PropTypes, Component } from 'react';
import { IndexLink, Link } from 'react-router';

export default class Nav extends Component {

  // Render with user links
  // Render without user links

  render() {
    return (
      <div>
        <header className='Pulse-header'>
          <h1>Marketplace</h1>
          <div className='Pulse-links'>
            <IndexLink to='/' activeClassName='active'>Listings</IndexLink>
          </div>
        </header>
      </div>
    );
  }
}
