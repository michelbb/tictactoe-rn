import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { PlayerSymbol } from '../hooks';
import { COLOR_PLAYER_O, COLOR_PLAYER_X } from './constants';

interface PlayerTextProps {
  player: PlayerSymbol;
}

export const PlayerText: React.FC<PlayerTextProps> = ({ player }) => {
  return (
    <Text
      style={[styles.playerText, player === PlayerSymbol.O ? styles.playerO : styles.playerX]}
    >{`Player ${player}`}</Text>
  );
};

const styles = StyleSheet.create({
  playerText: {
    fontWeight: 'bold',
  },
  playerO: {
    color: COLOR_PLAYER_O,
  },
  playerX: {
    color: COLOR_PLAYER_X,
  },
});
