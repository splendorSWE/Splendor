import React from 'react';
import { Link } from 'react-router-dom';
import NavigationButton from './NavigationButton';


function HomeButton() {
  return (
    <Link to="/">
      <button style={{ margin: '5px'}}>
        Home
      </button>
    </Link>
  );
}

export default function PageHeader({ title }) {
    return (
    <div className="page-header">
        <div className="page-title">{title}</div> {/* Title in the center */}
        <div className="spacer"></div> {/* Flexible space to push title to center */}
        <div className="nav-buttons">
          <NavigationButton destination="Home" link="/" />
          <NavigationButton destination="Sign In" link="/user-auth" />
        </div>
      </div>
    );
  }