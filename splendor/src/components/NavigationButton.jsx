import React from 'react';
import { Link } from 'react-router-dom';

export default function NavigationButton(props) {
    const { styling, destination, link, onClick} = props; 
    
    return (
      <Link to={link}>
        <button className={styling} onClick={onClick}>
          {destination}
        </button>
      </Link>
    );
  }