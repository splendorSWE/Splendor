import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Select2Tokens from './Select2Tokens';

describe('Token Selection Components', () => {
  let mockSetView;
  let mockHandleTakeTokens;
  let mockHandleTokenUpdate;

  const tokens = {
    white: 4,
    blue: 4,
    red: 4,
    green: 4,
    yellow: 4,
    wild: 4
  };

  beforeEach(() => {
    mockSetView = jest.fn();
    mockHandleTakeTokens = jest.fn();
    mockHandleTokenUpdate = jest.fn();
  });

  describe('Select2Tokens', () => {
    test('allows selecting exactly 2 of the same token', () => {
      render(
        <Select2Tokens
          tokens={tokens}
          setView={mockSetView}
          handleTakeTokens={mockHandleTakeTokens}
          handleTokenUpdate={mockHandleTokenUpdate}
        />
      );

      const whiteToken = screen.getByAltText('white Token');

      fireEvent.click(whiteToken);
      fireEvent.click(screen.getByText('Confirm'));

      expect(mockHandleTakeTokens).toHaveBeenCalledWith({ white: 2 });
      expect(mockSetView).toHaveBeenCalledWith('default');
    });

    test('prevents confirming if invalid selection made', () => {
      render(
        <Select2Tokens
          tokens={tokens}
          setView={mockSetView}
          handleTakeTokens={mockHandleTakeTokens}
          handleTokenUpdate={mockHandleTokenUpdate}
        />
      );

      const whiteToken = screen.getByAltText('white Token');
      const blueToken = screen.getByAltText('blue Token');

      fireEvent.click(whiteToken);
      fireEvent.click(blueToken);

      const confirmButton = screen.getByText('Confirm');
      expect(confirmButton).toBeDisabled();
    });
  });
});
