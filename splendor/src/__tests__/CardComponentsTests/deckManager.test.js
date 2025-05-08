import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeckManager from '../../components/CardComponents/DeckManager';

jest.mock('../../components/CardComponents/Card', () => ({ id, onClick }) => (
  <div data-testid={`card-${id}`} onClick={onClick}>
    MockCard {id}
  </div>
));

describe('DeckManager component', () => {
  const mockOnClick = jest.fn();

  const mockDeck = [
    { id: 'c1', level: 1, color: 'blue', redPrice: 0, greenPrice: 1, bluePrice: 1, yellowPrice: 0, whitePrice: 0, points: 0 },
    { id: 'c2', level: 2, color: 'red', redPrice: 2, greenPrice: 0, bluePrice: 1, yellowPrice: 1, whitePrice: 0, points: 1 },
  ];

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders a Card for each item in the deck', () => {
    const { getByTestId } = render(<DeckManager deck={mockDeck} onClick={mockOnClick} />);

    expect(getByTestId('card-c1')).toBeInTheDocument();
    expect(getByTestId('card-c2')).toBeInTheDocument();
  });

  it('calls onClick with correct card when a card is clicked', () => {
    const { getByTestId } = render(<DeckManager deck={mockDeck} onClick={mockOnClick} />);
    
    fireEvent.click(getByTestId('card-c1'));
    expect(mockOnClick).toHaveBeenCalledWith(mockDeck[0]);

    fireEvent.click(getByTestId('card-c2'));
    expect(mockOnClick).toHaveBeenCalledWith(mockDeck[1]);

    expect(mockOnClick).toHaveBeenCalledTimes(2);
  });

  it('handles non-array deck gracefully', () => {
    const { container } = render(<DeckManager deck={null} onClick={mockOnClick} />);
    expect(container).toBeInTheDocument();
    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
