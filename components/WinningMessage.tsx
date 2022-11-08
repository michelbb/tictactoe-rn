import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Winner } from '../hooks';
import { MEDIUM_TEXT_SIZE } from './constants';
import { PlayerText } from './PlayerText';

interface WinningMessageProps {
  winner: Winner;
}

export const WinningMessage: React.FC<WinningMessageProps> = ({ winner }) => {
  if (!winner) {
    return null;
  }

  if (winner === 'draw') {
    return <Text style={styles.text}>It's a draw!</Text>;
  }

  return (
    <Text style={styles.text}>
      Congratulations <PlayerText player={winner} />!
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: MEDIUM_TEXT_SIZE,
  },
});
