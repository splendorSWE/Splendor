import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CollectionButton from '../../components/GameboardComponents/CollectionButton';

describe('CollectionButton component', () => {
  const mockOnClick = jest.fn();
  const playerName = 'Player 1';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with player name and title', () => {
    render(
      <CollectionButton 
        player={playerName} 
        isSelected={false} 
        onClick={mockOnClick} 
      />
    );

    const button = screen.getByText(`${playerName} Collection`);
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('title', `${playerName} Collection`);
  });

  it('applies 50% opacity when isSelected is false', () => {
    render(
      <CollectionButton 
        player={playerName} 
        isSelected={false} 
        onClick={mockOnClick} 
      />
    );

    const button = screen.getByText(`${playerName} Collection`);
    expect(button).toHaveStyle('opacity: 0.5');
  });

  it('applies 100% opacity when isSelected is true', () => {
    render(
      <CollectionButton 
        player={playerName} 
        isSelected={true} 
        onClick={mockOnClick} 
      />
    );

    const button = screen.getByText(`${playerName} Collection`);
    expect(button).toHaveStyle('opacity: 1');
  });

  it('calls onClick when clicked', () => {
    render(
      <CollectionButton 
        player={playerName} 
        isSelected={true} 
        onClick={mockOnClick} 
      />
    );

    const button = screen.getByText(`${playerName} Collection`);
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
