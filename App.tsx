import {StyleSheet, View} from 'react-native';
import React from 'react';
import {AnimatedBall} from './components';

const App = () => {
  return (
    <View style={styles.container}>
      <AnimatedBall />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
