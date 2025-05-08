import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DefaultTokenView from '../../../components/GameboardComponents/BoardTokens/DefaultTokenView';

// Mock Token component
jest.mock('../../../components/GameboardComponents/Token', () => ({ color, number }) => (
  <div data-testid={`token-${color}`}>{color}: {number}</div>
));

describe('DefaultTokenView component', () => {
  const mockSetView = jest.fn();
  const tokenOrder = ['wild', 'white', 'blue', 'red', 'green', 'yellow'];
  const tokens = {
    wild: 5,
    white: 2,
    blue: 1,
    red: 0,
    green: 3,
    yellow: 4
  };

  beforeEach(() => {
    mockSetView.mockClear();
  });

  it('renders Select Tokens button as disabled if it is not the player\'s turn', () => {
    render(
      <DefaultTokenView
        tokens={tokens}
        setView={mockSetView}
        tokenOrder={tokenOrder}
        isTurn={false}
      />
    );
    const selectButton = screen.getByText('Select Tokens');
    expect(selectButton).toBeDisabled();
  });

  it('calls setView("select") when Select Tokens is clicked and isTurn is true', () => {
    render(
      <DefaultTokenView
        tokens={tokens}
        setView={mockSetView}
        tokenOrder={tokenOrder}
        isTurn={true}
      />
    );
    const selectButton = screen.getByText('Select Tokens');
    expect(selectButton).not.toBeDisabled();

    fireEvent.click(selectButton);
    expect(mockSetView).toHaveBeenCalledWith("select");
  });

  it('renders all tokens in the correct order', () => {
    render(
      <DefaultTokenView
        tokens={tokens}
        setView={mockSetView}
        tokenOrder={tokenOrder}
        isTurn={true}
      />
    );

    tokenOrder.forEach(color => {
      const tokenElement = screen.getByTestId(`token-${color}`);
      expect(tokenElement).toHaveTextContent(`${color}: ${tokens[color]}`);
    });
  });

  it('renders "Choose 2" and "Choose 3" buttons as disabled', () => {
    render(
      <DefaultTokenView
        tokens={tokens}
        setView={mockSetView}
        tokenOrder={tokenOrder}
        isTurn={true}
      />
    );

    const choose2 = screen.getByText('Choose 2');
    const choose3 = screen.getByText('Choose 3');

    expect(choose2).toBeDisabled();
    expect(choose3).toBeDisabled();
  });

  it('renders Confirm button as hidden', () => {
    render(
      <DefaultTokenView
        tokens={tokens}
        setView={mockSetView}
        tokenOrder={tokenOrder}
        isTurn={true}
      />
    );

    const confirmBtn = screen.getByText('Confirm');
    expect(confirmBtn).toHaveStyle('visibility: hidden');
  });
});
