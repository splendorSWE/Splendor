import React from 'react';
import { Link } from 'react-router-dom';


function HomeButton() {
    return (
      <Link to="/">
        <button>
          Home
        </button>
      </Link>
    );
}

export default function Profile() {
    return(
        <div>
            <HomeButton/>
        </div>
        
    )
}