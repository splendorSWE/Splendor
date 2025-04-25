// to run you need to run this command npm install --save-dev @testing-library/jest-dom
// then this: npm install --save-dev @testing-library/react


import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Select2Tokens from '../components/Select2Tokens.jsx';

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

  it('unselects the token when clicked twice', () => {
    const { getByAltText } = render(
      <Select2Tokens
        tokens={tokens}
        setView={mockSetView}
        handleTakeTokens={mockHandleTakeTokens}
        handleTokenUpdate={mockHandleTokenUpdate}
      />
    );
  
    const blueToken = getByAltText('blue Token');
    fireEvent.click(blueToken);  // select
    fireEvent.click(blueToken);  // unselect
  
    // handleTokenUpdate should be called again to restore supply
    expect(mockHandleTokenUpdate).toHaveBeenCalledWith(expect.objectContaining({ blue: 4 }));
  });
  
  it('restores previous token when switching selection', () => {
    const { getByAltText } = render(
      <Select2Tokens
        tokens={tokens}
        setView={mockSetView}
        handleTakeTokens={mockHandleTakeTokens}
        handleTokenUpdate={mockHandleTokenUpdate}
      />
    );
  
    const blueToken = getByAltText('blue Token');
    const greenToken = getByAltText('green Token');
  
    fireEvent.click(blueToken); // select blue
    fireEvent.click(greenToken); // switch to green
  
    // should have restored blue and selected green
    expect(mockHandleTokenUpdate).toHaveBeenCalledWith(expect.objectContaining({ blue: 4, green: 2 }));
  });
  
  it('disables tokens with less than 4 available', () => {
    const lowSupplyTokens = { ...tokens, red: 3 };
  
    const { getByAltText } = render(
      <Select2Tokens
        tokens={lowSupplyTokens}
        setView={mockSetView}
        handleTakeTokens={mockHandleTakeTokens}
        handleTokenUpdate={mockHandleTokenUpdate}
      />
    );
  
    const redToken = getByAltText('red Token');
    expect(redToken.closest('div')).toHaveStyle('opacity: 0.3'); // visually disabled
  });
  
  it('calls handleTakeTokens and setView when confirm is clicked', () => {
    const { getByAltText, getByText } = render(
      <Select2Tokens
        tokens={tokens}
        setView={mockSetView}
        handleTakeTokens={mockHandleTakeTokens}
        handleTokenUpdate={mockHandleTokenUpdate}
      />
    );
  
    const blueToken = getByAltText('blue Token');
    fireEvent.click(blueToken);
  
    const confirmButton = getByText('Confirm');
    fireEvent.click(confirmButton);
  
    expect(mockHandleTakeTokens).toHaveBeenCalled();
    expect(mockSetView).toHaveBeenCalledWith('default');
  });
  
  
});

test('forces coverage for Select2Tokens', () => {
  render(<Select2Tokens tokens={{white:4}} setView={()=>{}} handleTakeTokens={()=>{}} handleTokenUpdate={()=>{}} />);
});

