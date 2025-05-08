import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NobleCard from '../../components/GameboardComponents/NobleCard';

describe('NobleCard component', () => {
  const imagePath = '/mock-noble-image.png';

  it('renders the image with correct src and alt', () => {
    render(<NobleCard ImagePath={imagePath} />);
    
    const image = screen.getByAltText('Noble Card');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', imagePath);
  });
});
