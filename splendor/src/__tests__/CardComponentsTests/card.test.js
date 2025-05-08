import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../../components/CardComponents/Card'

jest.mock('../../components/CardComponents/GetPath', () => ({
  __esModule: true,
  default: jest.fn((id) => `/mock/path/${id}.png`)
}));

describe('Card component', () => {
  const mockOnClick = jest.fn();

  const defaultProps = {
    id: 'card1',
    level: 1,
    color: 'red',
    redPrice: 2,
    greenPrice: 0,
    bluePrice: 1,
    yellowPrice: 0,
    whitePrice: 0,
    points: 1,
    onClick: mockOnClick,
  };

  beforeEach(() => {
    mockOnClick.mockClear();
  });

//   it('renders correctly with image src and alt', () => {
//     const { getByAltText } = render(<Card {...defaultProps} />);
//     const img = getByAltText('Development Card');
//     expect(img).toBeInTheDocument();
//     expect(img).toHaveAttribute('src', '/mock/path/card1.png');
//   });

  it('calls onClick when image is clicked', () => {
    const { getByAltText } = render(<Card {...defaultProps} />);
    fireEvent.click(getByAltText('Development Card'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

//   it('renders different image when id changes', () => {
//     const { getByAltText } = render(<Card {...defaultProps} id="card99" />);
//     expect(getByAltText('Development Card')).toHaveAttribute('src', '/mock/path/card99.png');
//   });
});
