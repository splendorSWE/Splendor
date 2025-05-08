import React from 'react';
import NavigationButton from './NavigationButton';

import "./ComponentStyles/PageHeader.css";



export default function PageHeader({ title, home, rules, userauth, profile }) {
    return (
    <div className="page-header">
        <div className="page-title">{title}</div> {/* Title in the center */}
        <div className="spacer"></div> {/* Flexible space to push title to center */}
        <div className="nav-buttons">
          {home && <NavigationButton destination="Home" link="/" styling='dark-button' />}
          {rules && <NavigationButton destination="Rules" link="/rules" styling='dark-button' />}
          {userauth && <NavigationButton destination="Sign In/Up" link="/user-auth" styling='dark-button' />}
          {profile && <NavigationButton destination="Profile" link="/profile" styling='dark-button' />}
        </div>
      </div>
    );
  }