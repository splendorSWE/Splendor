// to run you need to run this command npm install --save-dev @testing-library/jest-dom
// then this: npm install --save-dev @testing-library/react


import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Select2Tokens from '../../src/pages/Gameboard'; // update the path if needed

describe('Select2Tokens Component', () => {
  const mockSetView = jest.fn();
  const mockHandleTakeTokens = jest.fn();
  const mockHandleTokenUpdate = jest.fn();
  
  const tokens = {
    white: 4,
    blue: 4,
    red: 4,
    green: 4,
    yellow: 4,
    wild: 5
  };

  it('renders tokens correctly', () => {
    const { getByAltText } = render(
      <Select2Tokens
        tokens={tokens}
        setView={mockSetView}
        handleTakeTokens={mockHandleTakeTokens}
        handleTokenUpdate={mockHandleTokenUpdate}
      />
    );

    expect(getByAltText('white Token')).toBeInTheDocument();
    expect(getByAltText('blue Token')).toBeInTheDocument();
    expect(getByAltText('red Token')).toBeInTheDocument();
    expect(getByAltText('green Token')).toBeInTheDocument();
    expect(getByAltText('yellow Token')).toBeInTheDocument();
    expect(getByAltText('wild Token')).toBeInTheDocument();
  });

  it('allows selecting exactly 2 tokens of the same color', () => {
    const { getByAltText, getByText } = render(
      <Select2Tokens
        tokens={tokens}
        setView={mockSetView}
        handleTakeTokens={mockHandleTakeTokens}
        handleTokenUpdate={mockHandleTokenUpdate}
      />
    );

    const blueToken = getByAltText('blue Token');
    fireEvent.click(blueToken); // Select 2 blues

    const confirmButton = getByText('Confirm');
    expect(confirmButton).toBeEnabled();
  });

  it('disables confirm button if invalid selection', () => {
    const { getByText } = render(
      <Select2Tokens
        tokens={tokens}
        setView={mockSetView}
        handleTakeTokens={mockHandleTakeTokens}
        handleTokenUpdate={mockHandleTokenUpdate}
      />
    );

    const confirmButton = getByText('Confirm');
    expect(confirmButton).toBeDisabled();
  });
});
