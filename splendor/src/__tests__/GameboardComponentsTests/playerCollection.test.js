import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlayerCollection from '../../components/GameboardComponents/PlayerCollection';

// Mocking subcomponents
jest.mock('../../components/GameboardComponents/ReservedCard', () => ({ viewCard, setViewCard, reservable, setSelectedCard, reservedCard, selectedCard }) => (
  <div data-testid="reserved-card">
    Reserved Card {reservedCard ? reservedCard.id : "None"}
  </div>
));

jest.mock('../../components/GameboardComponents/CollectionCard', () => ({ ImagePath, number }) => (
  <div data-testid="collection-card">
    <img src={ImagePath} alt="CollectionCard" />
    <span>{number}</span>
  </div>
));

jest.mock('../../components/GameboardComponents/Token', () => ({ color, number }) => (
  <div data-testid={`token-${color.toLowerCase()}`}>
    {color} Token: {number}
  </div>
));

describe('PlayerCollection component', () => {
  const baseProps = {
    Points: 15,
    tokens: {
      wild: 2,
      white: 3,
      blue: 4,
      red: 5,
      green: 6,
      yellow: 7
    },
    playerCards: {
      white: 1,
      blue: 2,
      red: 3,
      green: 4,
      yellow: 5
    },
    viewCard: true,
    setViewCard: jest.fn(),
    reservable: true,
    reservedCard: { id: 'card1' },
    setSelectedCard: jest.fn(),
    selectedCard: { id: 'card1' }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

//   it('renders player points correctly', () => {
//     render(<PlayerCollection {...baseProps} />);
//     expect(screen.getByText('15 Points')).toBeInTheDocument();
//   });

  it('renders each Token with correct colors and counts', () => {
    render(<PlayerCollection {...baseProps} />);

    expect(screen.getByTestId('token-wild')).toHaveTextContent('Wild Token: 2');
    expect(screen.getByTestId('token-white')).toHaveTextContent('White Token: 3');
    expect(screen.getByTestId('token-blue')).toHaveTextContent('Blue Token: 4');
    expect(screen.getByTestId('token-red')).toHaveTextContent('Red Token: 5');
    expect(screen.getByTestId('token-green')).toHaveTextContent('Green Token: 6');
    expect(screen.getByTestId('token-yellow')).toHaveTextContent('Yellow Token: 7');
  });

  it('renders each CollectionCard with correct image path and counts', () => {
    render(<PlayerCollection {...baseProps} />);

    const collectionCards = screen.getAllByTestId('collection-card');
    expect(collectionCards.length).toBe(5);

    expect(collectionCards[0]).toHaveTextContent('1');
    expect(collectionCards[1]).toHaveTextContent('2');
    expect(collectionCards[2]).toHaveTextContent('3');
    expect(collectionCards[3]).toHaveTextContent('4');
    expect(collectionCards[4]).toHaveTextContent('5');
  });

  it('renders ReservedCard with correct props', () => {
    render(<PlayerCollection {...baseProps} />);
    const reservedCard = screen.getByTestId('reserved-card');
    expect(reservedCard).toHaveTextContent('Reserved Card card1');
  });
});
