import 'react-native-gesture-handler';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import React from 'react';
// import {AnimatedBall} from './components';
// import {Duolingo} from './pages';
// import { UseTransition } from './pages';
// import {OpacityRect} from './pages';
import {PanGestureSimple, ScrollingHeader} from './pages';
// import {Slider} from './pages';
// import {PhotoSection} from './pages;
// import {PhotoSection} from './pages';
// import {PhotoSection2} from './pages';
// import {Chrome} from './pages';
import UberEats from './pages/UberEats';

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <UberEats />
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
