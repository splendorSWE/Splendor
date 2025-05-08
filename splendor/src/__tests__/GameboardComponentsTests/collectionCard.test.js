import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CollectionCard from '../../components/GameboardComponents/CollectionCard';

describe('CollectionCard component', () => {
  const imagePath = '/mock-image.png';
  const number = 5;

  it('renders the image with correct src and alt', () => {
    render(<CollectionCard ImagePath={imagePath} number={number} />);
    
    const image = screen.getByAltText('CollectionCard');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', imagePath);
  });

  it('renders the number correctly', () => {
    render(<CollectionCard ImagePath={imagePath} number={number} />);
    
    const numberText = screen.getByText(number.toString());
    expect(numberText).toBeInTheDocument();
  });
});
