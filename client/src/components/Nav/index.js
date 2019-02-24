import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <Link to='/'>
        <span className='navbar-brand'>
          React Reading List
        </span>
      </Link>
    </nav>
  );
}

export default Nav;
