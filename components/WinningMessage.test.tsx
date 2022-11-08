import React from 'react';
import { render } from '@testing-library/react-native';

import { WinningMessage } from './WinningMessage';
import { PlayerSymbol } from '../hooks';

describe('<WinningMessage />', () => {
  it.each([PlayerSymbol.O, PlayerSymbol.X])('renders the winning message correctly', (player) => {
    const { getByText } = render(<WinningMessage winner={player} />);

    expect(getByText('Congratulations !')).toBeVisible();
    expect(getByText(`Player ${player}`)).toBeVisible();
  });

  it('renders the draw message correctly', () => {
    const { getByText } = render(<WinningMessage winner={'draw'} />);

    expect(getByText("It's a draw!")).toBeVisible();
  });

  it('renders nothing when there is no winner', () => {
    const { queryByText } = render(<WinningMessage winner={null} />);

    expect(queryByText('Congratulations !')).toBeNull();
    expect(queryByText(`Player ${PlayerSymbol.O}`)).toBeNull();
    expect(queryByText(`Player ${PlayerSymbol.X}`)).toBeNull();
    expect(queryByText("It's a draw!")).toBeNull();
  });
});
