import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameEndPopup from '../../components/GameboardComponents/GameEndPopup';

describe('GameEndPopup component', () => {
  const baseProps = {
    visible: true,
    winner: true,
    playerName: 'Player 1',
    opponentName: 'Player 2',
    playerPoints: 50,
    opponentPoints: 45,
    playerPic: '/player1.png',
    opponentPic: '/player2.png',
    onClose: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not render when visible is false', () => {
    render(<GameEndPopup {...baseProps} visible={false} />);
    expect(screen.queryByText('You Win!')).not.toBeInTheDocument();
  });

  it('renders "You Win!" when winner is true', () => {
    render(<GameEndPopup {...baseProps} winner={true} />);
    expect(screen.getByText('You Win!')).toBeInTheDocument();
  });

  it('renders "You Lose." when winner is false', () => {
    render(<GameEndPopup {...baseProps} winner={false} />);
    expect(screen.getByText('You Lose.')).toBeInTheDocument();
  });

  it('displays player and opponent images with correct src', () => {
    render(<GameEndPopup {...baseProps} />);
    
    const playerImage = screen.getByAltText('Player');
    const opponentImage = screen.getByAltText('Opponent');
    
    expect(playerImage).toHaveAttribute('src', baseProps.playerPic);
    expect(opponentImage).toHaveAttribute('src', baseProps.opponentPic);
  });

  it('displays player and opponent names and scores correctly', () => {
    render(<GameEndPopup {...baseProps} />);
    
    expect(screen.getByText(baseProps.playerName)).toBeInTheDocument();
    expect(screen.getByText(`Points: ${baseProps.playerPoints}`)).toBeInTheDocument();
    expect(screen.getByText(baseProps.opponentName)).toBeInTheDocument();
    expect(screen.getByText(`Points: ${baseProps.opponentPoints}`)).toBeInTheDocument();
  });

  it('calls onClose when X button is clicked', () => {
    render(<GameEndPopup {...baseProps} />);
    const closeButton = screen.getByText('X');
    fireEvent.click(closeButton);
    expect(baseProps.onClose).toHaveBeenCalled();
  });

  it('calls onClose when "Return to Home" button is clicked', () => {
    render(<GameEndPopup {...baseProps} />);
    const returnButton = screen.getByText('Return to Home');
    fireEvent.click(returnButton);
    expect(baseProps.onClose).toHaveBeenCalled();
  });
});
