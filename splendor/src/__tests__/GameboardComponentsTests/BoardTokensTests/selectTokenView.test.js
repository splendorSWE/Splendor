import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectTokenView from '../../../components/GameboardComponents/BoardTokens/SelectTokenView';

// Mock Token
jest.mock('../../../components/GameboardComponents/Token', () => ({ color, number }) => (
  <div data-testid={`token-${color}`}>{color}: {number}</div>
));

describe('SelectTokenView component', () => {
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
    jest.clearAllMocks();
  });

  it('renders all Token components correctly', () => {
    render(
      <SelectTokenView
        tokens={tokens}
        setView={mockSetView}
        tokenOrder={tokenOrder}
      />
    );

    tokenOrder.forEach(color => {
      const token = screen.getByTestId(`token-${color}`);
      expect(token).toHaveTextContent(`${color}: ${tokens[color]}`);
    });
  });

  it('calls setView("default") when Back is clicked', () => {
    render(
      <SelectTokenView
        tokens={tokens}
        setView={mockSetView}
        tokenOrder={tokenOrder}
      />
    );

    fireEvent.click(screen.getByText('Back'));
    expect(mockSetView).toHaveBeenCalledWith('default');
  });

  it('calls setView("select2") when Choose 2 is clicked', () => {
    render(
      <SelectTokenView
        tokens={tokens}
        setView={mockSetView}
        tokenOrder={tokenOrder}
      />
    );

    fireEvent.click(screen.getByText('Choose 2'));
    expect(mockSetView).toHaveBeenCalledWith('select2');
  });

  it('calls setView("select3") when Choose 3 is clicked', () => {
    render(
      <SelectTokenView
        tokens={tokens}
        setView={mockSetView}
        tokenOrder={tokenOrder}
      />
    );

    fireEvent.click(screen.getByText('Choose 3'));
    expect(mockSetView).toHaveBeenCalledWith('select3');
  });

  it('renders Confirm button as always disabled', () => {
    render(
      <SelectTokenView
        tokens={tokens}
        setView={mockSetView}
        tokenOrder={tokenOrder}
      />
    );

    const confirmBtn = screen.getByText('Confirm');
    expect(confirmBtn).toBeDisabled();
  });
});
