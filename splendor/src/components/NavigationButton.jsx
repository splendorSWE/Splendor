import React from 'react';
import { Link } from 'react-router-dom';

export default function NavigationButton(props) {
    const { destination, link } = props; 
    
    return (
      <Link to={link}>
        <button 
            className='dark-button'
            >
          {destination}
        </button>
      </Link>
    );
  }