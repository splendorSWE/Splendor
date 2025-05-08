import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardPopUp from '../../components/GameboardComponents/CardPopUp';

describe('CardPopUp component', () => {
  const baseProps = {
    ImagePath: '/mock-image.png',
    viewCard: true,
    setViewCard: jest.fn(),
    playable: true,
    setPlayable: jest.fn(),
    reservable: true,
    setReservable: jest.fn(),
    handlePlayCard: jest.fn(),
    addReserveToken: jest.fn(),
    handleReserveCard: jest.fn(),
    reservedCard: { id: 'card1' },
    selectedCard: { id: 'card1' },
    checkCardAffordability: jest.fn(() => Promise.resolve(true)),
    gameState: { current_turn: 'p1' },
    playerID: 'p1'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders when viewCard is true', () => {
    render(<CardPopUp {...baseProps} />);
    expect(screen.getByAltText('Card Pop Up')).toBeInTheDocument();
  });

  it('does not render when viewCard is false', () => {
    render(<CardPopUp {...baseProps} viewCard={false} />);
    expect(screen.queryByAltText('Card Pop Up')).not.toBeInTheDocument();
  });

  it('closes the pop-up when X is clicked', () => {
    render(<CardPopUp {...baseProps} />);
    fireEvent.click(screen.getByText('X'));
    expect(baseProps.setViewCard).toHaveBeenCalledWith(false);
  });

  it('calls checkCardAffordability on mount with selectedCard.id', async () => {
    render(<CardPopUp {...baseProps} />);
    await waitFor(() => {
      expect(baseProps.checkCardAffordability).toHaveBeenCalledWith('card1');
    });
  });

  it('disables Play button if not playable or not player\'s turn', () => {
    const { rerender } = render(
      <CardPopUp {...baseProps} playable={false} />
    );
    expect(screen.getByText('Play')).toHaveClass('disabled');

    rerender(
      <CardPopUp {...baseProps} gameState={{ current_turn: 'p2' }} />
    );
    expect(screen.getByText('Play')).toHaveClass('disabled');
  });

  it('disables Reserve button if not reservable or not player\'s turn', () => {
    const { rerender } = render(
      <CardPopUp {...baseProps} reservable={false} />
    );
    expect(screen.getByText('Reserve')).toBeDisabled();

    rerender(
      <CardPopUp {...baseProps} gameState={{ current_turn: 'p2' }} />
    );
    expect(screen.getByText('Reserve')).toBeDisabled();
  });

  it('does not call handleReserveCard if reservable is false', () => {
    render(<CardPopUp {...baseProps} reservable={false} />);
    const reserveBtn = screen.getByText('Reserve');
    fireEvent.click(reserveBtn);

    expect(baseProps.handleReserveCard).not.toHaveBeenCalled();
  });
});
