import React from 'react';
import { render } from '@testing-library/react-native';

import { CurrentTurnMessage } from './CurrentTurnMessage';
import { PlayerSymbol } from '../hooks';

describe('<CurrentTurnMessage />', () => {
  it.each([PlayerSymbol.O, PlayerSymbol.X])('renders the message correctly', (currentPlayer) => {
    const { getByText } = render(<CurrentTurnMessage currentPlayer={currentPlayer} />);
    expect(getByText('Your turn !')).toBeVisible();
    expect(getByText(`Player ${currentPlayer}`)).toBeVisible();
  });
});
