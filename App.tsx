import 'react-native-gesture-handler';
import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
// import {AnimatedBall} from './components';
import {Duolingo, UseTransition} from './pages';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <UseTransition />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
