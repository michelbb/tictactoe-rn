import * as React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import { TicTacToeBoard } from './components';

const App: React.FC = () => {
  return (
    <LinearGradient colors={['#ffafbd', '#ffc3a0']} style={styles.linearGradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Tic Tac Toe</Text>
        <TicTacToeBoard />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default App;
