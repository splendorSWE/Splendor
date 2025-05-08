import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReservedCard from '../../components/GameboardComponents/ReservedCard';
import GetPath from '../../components/CardComponents/GetPath';


jest.mock('../../components/CardComponents/GetPath', () => jest.fn((id) => `/mock/path/${id}.png`));

describe('ReservedCard component', () => {
  const mockSetViewCard = jest.fn();
  const mockSetSelectedCard = jest.fn();

  const baseProps = {
    viewCard: false,
    setViewCard: mockSetViewCard,
    reservable: false,
    reservedCard: { id: 'card1' },
    selectedCard: null,
    setSelectedCard: mockSetSelectedCard
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders image with correct src and alt', () => {
    render(<ReservedCard {...baseProps} />);
    
    const image = screen.getByAltText('CollectionCard');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/Images/Plain Cards/Reserved Card.png');
  });

  it('applies correct styles based on reservable (not reservable)', () => {
    render(<ReservedCard {...baseProps} reservable={false} />);
    
    const cardDiv = screen.getByText('Res').closest('.collection-card-div');
    expect(cardDiv).toHaveStyle('opacity: 1');
    expect(cardDiv).toHaveStyle('pointer-events: auto');
  });

  it('applies correct styles based on reservable (reservable)', () => {
    render(<ReservedCard {...baseProps} reservable={true} />);
    
    const cardDiv = screen.getByText('Res').closest('.collection-card-div');
    expect(cardDiv).toHaveStyle('opacity: 0');
    expect(cardDiv).toHaveStyle('pointer-events: none');
  });

  it('clicks the image and triggers setViewCard and setSelectedCard if reservedCard exists', () => {
    render(<ReservedCard {...baseProps} />);
    
    const image = screen.getByAltText('CollectionCard');
    fireEvent.click(image);

    expect(mockSetViewCard).toHaveBeenCalledWith(true);
    expect(mockSetSelectedCard).toHaveBeenCalledWith(baseProps.reservedCard);
    expect(GetPath).toHaveBeenCalledWith('card1');
  });

  it('does nothing on click if reservedCard is not present', () => {
    render(<ReservedCard {...baseProps} reservedCard={null} />);
    
    const image = screen.getByAltText('CollectionCard');
    fireEvent.click(image);

    expect(mockSetViewCard).not.toHaveBeenCalled();
    expect(mockSetSelectedCard).not.toHaveBeenCalled();
  });
});
