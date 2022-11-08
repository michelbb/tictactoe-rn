import * as React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { WinningLineStartPosition } from '../hooks';
import { BUTTON_SIZE, CELL_MARGIN, DIVIDER_WIDTH } from './constants';

interface WinningRowIndicatorProps {
  color: string;
  winningLineStartPosition?: WinningLineStartPosition;
}

export const WinningRowIndicator: React.FC<WinningRowIndicatorProps> = ({
  color,
  winningLineStartPosition,
}) => {
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (!winningLineStartPosition) {
      return;
    }

    const animation = Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });

    animation.start();

    return () => {
      animation.stop();
      opacity.setValue(0);
    };
  }, [opacity, winningLineStartPosition]);

  if (!winningLineStartPosition) {
    return null;
  }

  return (
    <Animated.View
      style={[
        { backgroundColor: color, opacity },
        styles.base,
        styles[winningLineStartPosition],
      ]}
    />
  );
};

const VERTICAL_DIVIDER_OFFSET = BUTTON_SIZE + 2 * CELL_MARGIN;
const HORIZONTAL_DIVIDER_OFFSET = 1.5 * BUTTON_SIZE + 3 * CELL_MARGIN;
const VERTICAL_X_OFFSET = BUTTON_SIZE / 2 + CELL_MARGIN;
const ALL_DIVIDERS_WIDTH = 2 * DIVIDER_WIDTH;

const styles = StyleSheet.create({
  base: {
    height: '100%',
    position: 'absolute',
    top: 0,
    width: 8,
    zIndex: 1,
  },
  d1: {
    height: '140%',
    right: 0,
    transform: [
      { rotate: '135 deg' },
      { translateX: VERTICAL_DIVIDER_OFFSET * 0.6 },
      { translateY: VERTICAL_DIVIDER_OFFSET * 1.45 },
    ],
  },
  d2: {
    height: '140%',
    left: 0,
    transform: [
      { rotate: '45 deg' },
      { translateX: VERTICAL_DIVIDER_OFFSET * 0.6 },
      { translateY: -VERTICAL_DIVIDER_OFFSET * 1.45 },
    ],
  },
  h1: {
    left: 0,
    transform: [{ translateX: VERTICAL_X_OFFSET - ALL_DIVIDERS_WIDTH * 2 }],
  },
  h2: {
    left: 0,
    transform: [{ translateX: VERTICAL_X_OFFSET * 3 - ALL_DIVIDERS_WIDTH * 2 }],
  },
  h3: {
    left: 0,
    transform: [{ translateX: VERTICAL_X_OFFSET * 5 - ALL_DIVIDERS_WIDTH }],
  },
  v1: {
    right: 0,
    transform: [
      { rotate: '90 deg' },
      { translateX: -VERTICAL_DIVIDER_OFFSET },
      { translateY: HORIZONTAL_DIVIDER_OFFSET - ALL_DIVIDERS_WIDTH },
    ],
  },
  v2: {
    right: 0,
    transform: [
      { rotate: '90 deg' },
      { translateX: 0 },
      { translateY: HORIZONTAL_DIVIDER_OFFSET - ALL_DIVIDERS_WIDTH },
    ],
  },
  v3: {
    right: 0,
    transform: [
      { rotate: '90 deg' },
      { translateX: VERTICAL_DIVIDER_OFFSET },
      { translateY: HORIZONTAL_DIVIDER_OFFSET - ALL_DIVIDERS_WIDTH },
    ],
  },
});
