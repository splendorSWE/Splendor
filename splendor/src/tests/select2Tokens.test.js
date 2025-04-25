
jest.mock('react-router-dom', () => ({
    Link: ({ children, ...props }) => {
      const React = require('react');
      return React.createElement('div', props, children);
    }
  }));
  
  const React = require('react');
  const { render, screen, fireEvent } = require('@testing-library/react');
  const { Select2Tokens } = require('../pages/Gameboard');
  



describe('Select2Tokens component', () => {
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

    render(
      <Select2Tokens
        tokens={tokens}
        setView={mockSetView}
        handleTakeTokens={mockHandleTakeTokens}
        handleTokenUpdate={mockHandleTokenUpdate}
      />
    );
  });

  test('Confirm button is disabled initially', () => {
    const confirmBtn = screen.getByText('Confirm');
    expect(confirmBtn).toBeDisabled();
  });

  test('prevents selecting tokens with supply < 4', () => {
    const lowTokens = { ...tokens, red: 2 };
    render(
      <Select2Tokens
        tokens={lowTokens}
        setView={mockSetView}
        handleTakeTokens={mockHandleTakeTokens}
        handleTokenUpdate={mockHandleTokenUpdate}
      />
    );
    const redToken = screen.getByAltText('red Token');
    expect(redToken).toBeDisabled();
  });

  test('allows selecting exactly 2 of the same token', () => {
    const whiteToken = screen.getByAltText('white Token');
    fireEvent.click(whiteToken);
    expect(mockHandleTokenUpdate).toHaveBeenCalledWith(expect.objectContaining({ white: 2 }));

    fireEvent.click(whiteToken);
    expect(mockHandleTokenUpdate).toHaveBeenCalledWith(expect.objectContaining({ white: 4 }));

    fireEvent.click(whiteToken);
    const confirmBtn = screen.getByText('Confirm');
    expect(confirmBtn).toBeDisabled();

    fireEvent.click(whiteToken);
    expect(mockHandleTokenUpdate).toHaveBeenCalledWith(expect.objectContaining({ white: 2 }));
    fireEvent.click(confirmBtn);
    expect(mockHandleTakeTokens).toHaveBeenCalledWith({ white: 2 });
    expect(mockSetView).toHaveBeenCalledWith('default');
  });

  test('prevents confirming if invalid mixed selection', () => {
    const whiteToken = screen.getByAltText('white Token');
    const blueToken = screen.getByAltText('blue Token');
    fireEvent.click(whiteToken);
    fireEvent.click(blueToken);
    const confirmBtn = screen.getByText('Confirm');
    expect(confirmBtn).toBeDisabled();
  });

  test('switching selection restores previous and selects new', () => {
    const whiteToken = screen.getByAltText('white Token');
    const greenToken = screen.getByAltText('green Token');

    fireEvent.click(whiteToken);
    expect(mockHandleTokenUpdate).toHaveBeenLastCalledWith(expect.objectContaining({ white: 2 }));

    fireEvent.click(greenToken);
    expect(mockHandleTokenUpdate).toHaveBeenLastCalledWith(expect.objectContaining({ white: 4, green: 2 }));
  });

  test('unselecting the same token restores supply', () => {
    const greenToken = screen.getByAltText('green Token');
    fireEvent.click(greenToken);
    expect(mockHandleTokenUpdate).toHaveBeenLastCalledWith(expect.objectContaining({ green: 2 }));

    fireEvent.click(greenToken);
    expect(mockHandleTokenUpdate).toHaveBeenLastCalledWith(expect.objectContaining({ green: 4 }));
  });
});
