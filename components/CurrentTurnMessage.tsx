import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { PlayerSymbol } from "../hooks";
import { MEDIUM_TEXT_SIZE } from "./constants";
import { PlayerText } from "./PlayerText";

interface CurrentTurnMessageProps {
  currentPlayer: PlayerSymbol;
}

export const CurrentTurnMessage: React.FC<CurrentTurnMessageProps> = ({
  currentPlayer,
}) => {
  return (
    <Text style={styles.text}>
      Your turn <PlayerText player={currentPlayer} />!
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: MEDIUM_TEXT_SIZE,
  },
});
