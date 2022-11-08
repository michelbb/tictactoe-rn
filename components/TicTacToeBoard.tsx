import * as React from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PlayerSymbol, useTicTacToe } from '../hooks';
import {
  BUTTON_SIZE,
  CELL_MARGIN,
  COLOR_PLAYER_O,
  COLOR_PLAYER_X,
  DIVIDER_COLOR,
  DIVIDER_WIDTH,
} from './constants';
import { CurrentTurnMessage } from './CurrentTurnMessage';
import { WinningMessage } from './WinningMessage';
import { WinningRowIndicator } from './WinningRowIndicator';

export const TicTacToeBoard: React.FC = () => {
  const { currentPlayer, boardState, reset, takeTurn, winner, winningLineStartPosition } =
    useTicTacToe();
  const opacity = React.useRef(new Animated.Value(0)).current;

  if (winningLineStartPosition) {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }

  const winnerColor = winner === PlayerSymbol.X ? COLOR_PLAYER_X : COLOR_PLAYER_O;

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        {winner ? (
          <WinningMessage winner={winner} />
        ) : (
          <CurrentTurnMessage currentPlayer={currentPlayer} />
        )}
      </View>
      <View style={styles.board}>
        <WinningRowIndicator
          color={winnerColor}
          winningLineStartPosition={winningLineStartPosition}
        />
        {boardState.map((row, rowIndex) => (
          <View style={styles.row} key={rowIndex}>
            <View>
              {row.map((playerSymbol, columnIndex) => (
                <View key={columnIndex}>
                  {columnIndex > 0 && <View style={styles.horizontalDivider} />}
                  <TouchableOpacity
                    disabled={!!playerSymbol || !!winner}
                    onPress={() => takeTurn(rowIndex, columnIndex)}
                    style={styles.button}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        playerSymbol === PlayerSymbol.O ? styles.payerO : styles.playerX,
                      ]}
                    >
                      {playerSymbol}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            {rowIndex < row.length - 1 && <View style={styles.verticalDivider} />}
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={() => reset()}>
        <Text style={styles.resetButtonText}>{winner ? 'Play again' : 'Reset'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    display: 'flex',
    height: BUTTON_SIZE,
    justifyContent: 'center',
    margin: CELL_MARGIN,
    width: BUTTON_SIZE,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 48,
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  horizontalDivider: {
    height: DIVIDER_WIDTH,
    backgroundColor: DIVIDER_COLOR,
  },
  messageContainer: {
    marginBottom: 8,
  },
  payerO: {
    color: COLOR_PLAYER_O,
  },
  playerX: {
    color: COLOR_PLAYER_X,
  },
  resetButton: {
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#3a1c71',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resetButtonText: {
    color: '#3a1c71',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  verticalDivider: {
    height: BUTTON_SIZE * 3 + CELL_MARGIN * 6 + 2 * DIVIDER_WIDTH,
    width: DIVIDER_WIDTH,
    backgroundColor: DIVIDER_COLOR,
  },
});
