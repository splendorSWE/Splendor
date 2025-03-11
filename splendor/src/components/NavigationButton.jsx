import React from 'react';
import { Link } from 'react-router-dom';

export default function NavigationButton(props) {
    const { styling, destination, link, onClick, state} = props; 
    
    return (
      <Link to={link} state={state}>
        <button className={styling} onClick={onClick}>
          {destination}
        </button>
      </Link>
    );
  }