import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Select3Tokens from '../../../components/GameboardComponents/BoardTokens/Select3Tokens';

// Mock Token
jest.mock('../../../components/GameboardComponents/Token', () => ({ color, number, onClick, isSelected, isDisabled }) => {
  return (
    <button
      data-testid={`token-${color}`}
      disabled={isDisabled}
      style={{ fontWeight: isSelected ? 'bold' : 'normal' }}
      onClick={onClick}
    >
      {color}: {number}
    </button>
  );
});

describe('Select3Tokens component', () => {
  const mockSetView = jest.fn();
  const mockHandleTakeTokens = jest.fn();
  const mockHandleTokenUpdate = jest.fn();

  const tokenOrder = ['wild', 'white', 'blue', 'red', 'green', 'yellow'];
  const tokens = {
    wild: 5,
    white: 2,
    blue: 2,
    red: 2,
    green: 2,
    yellow: 2
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all tokens and disables wild', () => {
    render(
      <Select3Tokens
        tokens={tokens}
        tokenOrder={tokenOrder}
        setView={mockSetView}
        handleTakeTokens={mockHandleTakeTokens}
        handleTokenUpdate={mockHandleTokenUpdate}
      />
    );

    tokenOrder.forEach(color => {
      const tokenButton = screen.getByTestId(`token-${color}`);
      expect(tokenButton).toBeInTheDocument();
      if (color === 'wild') {
        expect(tokenButton).toBeDisabled();
      }
    });
  });

  it('selects and deselects up to 3 tokens', () => {
    render(
      <Select3Tokens
        tokens={tokens}
        tokenOrder={tokenOrder}
        setView={mockSetView}
        handleTakeTokens={mockHandleTakeTokens}
        handleTokenUpdate={mockHandleTokenUpdate}
      />
    );

    const blue = screen.getByTestId('token-blue');
    const red = screen.getByTestId('token-red');
    const green = screen.getByTestId('token-green');
    const yellow = screen.getByTestId('token-yellow');

    fireEvent.click(blue);
    fireEvent.click(red);
    fireEvent.click(green);

    // 4th click should not register
    fireEvent.click(yellow);

    expect(mockHandleTokenUpdate).toHaveBeenCalledTimes(3); // only 3 selections allowed
  });

  it('deselects a token on second click', () => {
    render(
      <Select3Tokens
        tokens={tokens}
        tokenOrder={tokenOrder}
        setView={mockSetView}
        handleTakeTokens={mockHandleTakeTokens}
        handleTokenUpdate={mockHandleTokenUpdate}
      />
    );

    const blue = screen.getByTestId('token-blue');
    fireEvent.click(blue); // select
    fireEvent.click(blue); // deselect

    expect(mockHandleTokenUpdate).toHaveBeenCalledTimes(2);
  });

  it('Confirm button is disabled unless 3 tokens selected', () => {
    render(
      <Select3Tokens
        tokens={tokens}
        tokenOrder={tokenOrder}
        setView={mockSetView}
        handleTakeTokens={mockHandleTakeTokens}
        handleTokenUpdate={mockHandleTokenUpdate}
      />
    );

    const confirmBtn = screen.getByText('Confirm');
    expect(confirmBtn).toBeDisabled();

    fireEvent.click(screen.getByTestId('token-blue'));
    fireEvent.click(screen.getByTestId('token-red'));
    fireEvent.click(screen.getByTestId('token-green'));

    expect(confirmBtn).not.toBeDisabled();
  });

  it('calls handleTakeTokens and sets view to default when Confirm is clicked', () => {
    render(
      <Select3Tokens
        tokens={tokens}
        tokenOrder={tokenOrder}
        setView={mockSetView}
        handleTakeTokens={mockHandleTakeTokens}
        handleTokenUpdate={mockHandleTokenUpdate}
      />
    );

    fireEvent.click(screen.getByTestId('token-blue'));
    fireEvent.click(screen.getByTestId('token-red'));
    fireEvent.click(screen.getByTestId('token-green'));

    const confirmBtn = screen.getByText('Confirm');
    fireEvent.click(confirmBtn);

    expect(mockHandleTakeTokens).toHaveBeenCalled();
    expect(mockSetView).toHaveBeenCalledWith('default');
  });

  it('back button resets tokens and sets view to default', () => {
    render(
      <Select3Tokens
        tokens={tokens}
        tokenOrder={tokenOrder}
        setView={mockSetView}
        handleTakeTokens={mockHandleTakeTokens}
        handleTokenUpdate={mockHandleTokenUpdate}
      />
    );

    const backBtn = screen.getByText('Back');
    fireEvent.click(backBtn);

    expect(mockHandleTokenUpdate).toHaveBeenCalled();
    expect(mockSetView).toHaveBeenCalledWith('default');
  });

  it('choose 2 and 3 buttons switch views', () => {
    render(
      <Select3Tokens
        tokens={tokens}
        tokenOrder={tokenOrder}
        setView={mockSetView}
        handleTakeTokens={mockHandleTakeTokens}
        handleTokenUpdate={mockHandleTokenUpdate}
      />
    );

    fireEvent.click(screen.getByText('Choose 2'));
    expect(mockSetView).toHaveBeenCalledWith('select2');

    fireEvent.click(screen.getByText('Choose 3'));
    expect(mockSetView).toHaveBeenCalledWith('select3');
  });
});
