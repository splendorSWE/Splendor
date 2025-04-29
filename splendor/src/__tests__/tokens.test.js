import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Token from '../components/Token';

describe('Token component', () => {
  const mockOnClick = jest.fn();

  const defaultProps = {
    color: 'blue',
    number: 3,
    onClick: mockOnClick,
    isSelected: false,
    isDisabled: false,
  };

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders correctly with color and number', () => {
    const { getByAltText, getByText } = render(<Token {...defaultProps} />);

    expect(getByAltText('blue Token')).toBeInTheDocument();
    expect(getByText('3')).toBeInTheDocument();
  });

  it('calls onClick when clicked if not disabled', () => {
    const { getByAltText } = render(<Token {...defaultProps} />);
    const tokenImage = getByAltText('blue Token');

    fireEvent.click(tokenImage.parentElement);
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('does NOT call onClick when disabled', () => {
    const { getByAltText } = render(<Token {...defaultProps} isDisabled={true} />);
    const tokenImage = getByAltText('blue Token');

    fireEvent.click(tokenImage.parentElement);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('shows selection styles when selected', () => {
    const { container } = render(<Token {...defaultProps} isSelected={true} />);
    const outerDiv = container.querySelector('.token-div > div');

    expect(outerDiv).toHaveStyle('border: 4px solid rgb(194, 194, 194)');
    expect(outerDiv).toHaveStyle('box-shadow: 0 0 20px #27394D');
  });

  it('does not show selection styles when not selected', () => {
    const { container } = render(<Token {...defaultProps} isSelected={false} />);
    const outerDiv = container.querySelector('.token-div > div');

    expect(outerDiv).toHaveStyle('border: none');
    expect(outerDiv).toHaveStyle('box-shadow: none');
  });
});
