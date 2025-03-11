import React from 'react';
import NavigationButton from './NavigationButton';

import "./componentStyles/PageHeader.css";



export default function PageHeader({ title }) {
    return (
    <div className="page-header">
        <div className="page-title">{title}</div> {/* Title in the center */}
        <div className="spacer"></div> {/* Flexible space to push title to center */}
        <div className="nav-buttons">
          <NavigationButton destination="Home" link="/" styling='dark-button' />
          <NavigationButton destination="Rules" link="/user-auth" styling='dark-button' />
        </div>
      </div>
    );
  }